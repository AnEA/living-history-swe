
package com.ws;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;

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

/**
 * @author Ilker Karamanli
 * @Summary Memory specific data handled here.
 */
@Stateless
@Path("/memory")
public class MemoryResource {

   @POST
   @Path("/get")
   @Consumes(MediaType.APPLICATION_JSON)
   @Produces(MediaType.APPLICATION_JSON)
   public Response getAllMemories(InputStream requestBean) {
      try {

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
               @SuppressWarnings("unused")
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
               jObjMem.put("content", content);
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
         }

         return Response.ok(jArray.toString()).build();
      }
      catch (Exception e) {
         return Response.ok(new ErrorResponseBean(e)).build();
      }
   }

   @POST
   @Path("/creatememory")
   @Consumes(MediaType.APPLICATION_JSON)
   @Produces(MediaType.APPLICATION_JSON)
   public Response createMemory(InputStream requestBean) {
      try {

         BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(requestBean));
         JSONObject obj = new JSONObject(bufferedReader.readLine());
         String place_id = obj.getString("place_id");
         String author = obj.getString("author");
         String imageUrl = obj.getString("imageUrl");
         String content = obj.getString("content");
         String tags = obj.getString("tags");
         String date = obj.getString("date");
         boolean active = obj.getBoolean("active");

         SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
         Date startDateParsed = format.parse(date);
         java.sql.Date dbDate = new java.sql.Date(startDateParsed.getTime());

         Connection conn = ConnectDatabase.getInstance().getConnection();
         CallableStatement stmtMem = null;
         stmtMem = conn.prepareCall("INSERT INTO memory (place_id, author, image, content, tags, mem_date, active) values(?,?,?,?,?,?,?);");
         stmtMem.setString(1, place_id);
         stmtMem.setString(2, author);
         stmtMem.setString(3, imageUrl);
         stmtMem.setString(4, content);
         stmtMem.setString(5, tags);
         stmtMem.setDate(6, dbDate);
         stmtMem.setBoolean(7, active);
         stmtMem.executeUpdate();

         JSONObject jObjResponse = new JSONObject();
         jObjResponse.put("success", "true");

         return Response.status(201).type("application/json").entity(jObjResponse.toString()).build();
      }
      catch (Exception e) {
         System.out.println(e.getMessage());
         return Response.ok(new ErrorResponseBean(e)).build();
      }
   }

}
