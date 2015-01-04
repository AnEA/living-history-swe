
package com.ws;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URLEncoder;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.methods.GetMethod;
import org.json.JSONArray;
import org.json.JSONObject;

import bean.ErrorResponseBean;

import com.swe.database.ConnectDatabase;

/**
 * @author Ilker Karamanli
 * @Summary Semantic Search.
 */
@Stateless
@Path("/search")
public class SemanticSearch {

   @POST
   @Path("/filter")
   @Consumes(MediaType.APPLICATION_JSON)
   @Produces(MediaType.APPLICATION_JSON)
   public Response getSemanticResults(InputStream requestBean) {
      try {

         BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(requestBean));
         JSONObject obj = new JSONObject(bufferedReader.readLine());
         String searchText = obj.getString("search");
         String searchMaxDate = String.valueOf(obj.getInt("maxDate"));
         String searchMinDate = String.valueOf(obj.getInt("minDate"));

         String query = searchText.replaceAll(" ", "+");
         String service_url = "https://www.googleapis.com/freebase/v1/search";
         String url = service_url + "?query=" + URLEncoder.encode(query, "UTF-8") + "&lang=en&scoring=entity&prefixed=true";

         HttpClient client = new HttpClient();
         HttpMethod method = new GetMethod(url);
         client.executeMethod(method);
         InputStream ins = method.getResponseBodyAsStream();

         BufferedReader bufferedReaderResult = new BufferedReader(new InputStreamReader(ins));
         JSONObject objRslt = new JSONObject(bufferedReaderResult.readLine());
         JSONArray rsltArray = objRslt.getJSONArray("result");

         Connection conn = ConnectDatabase.getInstance().getConnection();

         JSONArray freebaseWords = new JSONArray();
         JSONArray jArray = new JSONArray();

         for (int i = 0; i < 5  ; i++) {
            JSONObject jsonobject = rsltArray.getJSONObject(i);
            String name = jsonobject.getString("name");

            System.out.println(name);
            freebaseWords.put(name);

            Statement stmt = null;
            stmt = conn.createStatement();
            String sql = "select memory.memory_id , memory.place_id , memory.title , place.place_name, place.latitude, place.longtitude, place.address_components, memory.author , " +
                         "memory.image_url, memory.content , memory.tags , memory.mem_date , memory.active " +
                         "from place inner join memory on place.place_id = memory.place_id where " +
                         "tags like '%" + name +"%' or address_components like '%" + name + "%' or content like '%"+ name + "%' or title like '%"+ name +"%'";

            ResultSet rs = stmt.executeQuery(sql);

            while (rs.next()) {
               // Retrieve by column name
               String placeName = rs.getString("place_name");
               String place = rs.getString("place_id");
               double latitude = rs.getDouble("latitude");
               double longitude = rs.getDouble("longtitude");

               JSONArray jArrayMemory = new JSONArray();
               String memory_id = rs.getString("memory_id");
               System.out.println("while re.next() - Memory ID is:" + memory_id);
               @SuppressWarnings("unused")
               String place_id = rs.getString("place_id");
               String title = rs.getString("title");
               String author = rs.getString("author");
               String image = rs.getString("image_url");
               String content = rs.getString("content");
               String tags = rs.getString("tags");
               Date mem_date = rs.getDate("mem_date");
               boolean active = rs.getBoolean("active");

               JSONObject jObjMem = new JSONObject();
               jObjMem.put("memoryId", memory_id);
               jObjMem.put("title", title);
               jObjMem.put("author", author);
               jObjMem.put("imageUrl", image);
               jObjMem.put("content", content);
               String[] tagsArray = tags.split(";");
               jObjMem.put("tags", tagsArray);
               jObjMem.put("date", mem_date);
               jObjMem.put("active", active);
               jArrayMemory.put(jObjMem);

               JSONObject jObj = new JSONObject();
               jObj.put("name", placeName);
               jObj.put("place_id", place);
               jObj.put("latitude", latitude);
               jObj.put("longitude", longitude);
               jObj.put("memories", jArrayMemory);

               SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
               String dateMaxInString = "31/12/" + searchMaxDate;
               String dateMinInString = "01/01/" + searchMinDate;

               Date dateMax = formatter.parse(dateMaxInString);
               Date dateMin = formatter.parse(dateMinInString);

               if ((mem_date.after(dateMin) || mem_date.equals(dateMin)) && (mem_date.before(dateMax) || mem_date.equals(dateMax))) {
                  jArray.put(jObj);
               }
            }
         }

         return Response.ok(jArray.toString()).build();

      }
      catch (Exception e) {
         return Response.ok(new ErrorResponseBean(e)).build();
      }
   }

}
