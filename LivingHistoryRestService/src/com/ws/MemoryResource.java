
package com.ws;

import java.io.InputStream;
import java.sql.*;

import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.JSONArray;
import org.json.JSONObject;

import bean.ErrorResponseBean;

import com.swe.database.ConnectDatabase;

@Stateless
@Path("/memory")
public class MemoryResource {

   @POST
   @Path("/get")
   @Consumes(MediaType.APPLICATION_JSON)
   @Produces(MediaType.APPLICATION_JSON)
   public Response getAllMemories(InputStream requestBean) {
      try {

         // If you need to get data from request, you can parse here.
         // BufferedReader bufferedReader = new BufferedReader(new
         // InputStreamReader(requestBean));
         // System.out.println(bufferedReader.readLine());

         Connection conn = ConnectDatabase.getInstance().getConnection();
         Statement stmt = null;
         System.out.println("Creating statement...");
         stmt = conn.createStatement();
         String sql = "SELECT * FROM place";
         ResultSet rs = stmt.executeQuery(sql);

         JSONArray jArray = new JSONArray();
         while (rs.next()) {
            // Retrieve by column name
            String placeName = rs.getString("placeName");
            String place = rs.getString("place_id");
            double latitude = rs.getDouble("latitude");
            double longitude = rs.getDouble("longtitude");

            JSONArray jArrayMemory = new JSONArray();
            // get another query to get Memories.
            CallableStatement stmtMem = null;
            System.out.println("Creating statement for Memories of " + placeName);
            stmtMem = conn.prepareCall("select * from memory where place_id=? ;");
            stmtMem.setString(1, place);
            ResultSet rsMem = stmtMem.executeQuery();

            while (rsMem.next()) {
               String place_id = rsMem.getString("place_id");
               String author = rsMem.getString("author");
               String image = rsMem.getString("image");
               String content = rsMem.getString("content");
               String tags = rsMem.getString("tags");
               Date mem_date = rsMem.getDate("mem_date");
               boolean active = rsMem.getBoolean("active");
               
               JSONObject jObjMem = new JSONObject();
               jObjMem.put("author", author);
               jObjMem.put("imageUrl", image);
               jObjMem.put("tags", tags);
               jObjMem.put("date", mem_date);
               jObjMem.put("active", active);
               jArrayMemory.put(jObjMem);

            }

            JSONObject jObj = new JSONObject();
            jObj.put("name", placeName);
            jObj.put("place_id", place);
            jObj.put("latitude", latitude);
            jObj.put("longitude", longitude);
            jObj.put("memories", jArrayMemory);
            jArray.put(jObj);

            // Display values
            System.out.print("placeName: " + placeName);
            System.out.print(", place: " + place);
            System.out.print(", latitude: " + latitude);
            System.out.println(", longitude: " + longitude);
         }

         // // get data, send response
         // UpdateResponseBean responseBean = new UpdateResponseBean();
         // responseBean.setName("Boğaziçi Üniversitesi Kuzey Kampüsü");
         // responseBean.setPlaceID("bogazici_kampus");
         // responseBean.setLatitude("41.085452");
         // responseBean.setLongitude("29.044493999999986");
         // responseBean.setMemories("author");
         // // insert update to db
         // System.out.println(responseBean.toString());
         // return Response.ok(responseBean.toString()).build();
         return Response.ok(jArray.toString()).build();
      }
      catch (Exception e) {
         return Response.ok(new ErrorResponseBean(e)).build();
      }
   }
}
