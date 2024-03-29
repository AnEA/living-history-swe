
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
import javax.ws.rs.GET;
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

   @GET
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
            String placeName = rs.getString("place_name");
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
               String memory_id = rsMem.getString("memory_id");
               @SuppressWarnings("unused")
               String place_id = rsMem.getString("place_id");
               String title = rsMem.getString("title");
               String author = rsMem.getString("author");
               String image = rsMem.getString("image_url");
               String content = rsMem.getString("content");
               String tags = rsMem.getString("tags");
               Date mem_date = rsMem.getDate("mem_date");
               boolean active = rsMem.getBoolean("active");

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
   @Path("/create")
   @Consumes(MediaType.APPLICATION_JSON)
   @Produces(MediaType.APPLICATION_JSON)
   public Response createMemory(InputStream requestBean) {
      try {

         BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(requestBean));
         JSONObject obj = new JSONObject(bufferedReader.readLine());

         String author = obj.getString("author");
         String title = obj.getString("title");
         String email = obj.getString("email");
         String imageUrl = obj.getString("imageUrl");
         String content = obj.getString("content");
         JSONArray tags = (JSONArray) obj.get("tags");
         String date = obj.getString("date");
         boolean active = obj.getBoolean("active");
         JSONArray places = (JSONArray) obj.get("places");

         SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
         Date startDateParsed = format.parse(date);
         java.sql.Date dbDate = new java.sql.Date(startDateParsed.getTime());

         Connection conn = ConnectDatabase.getInstance().getConnection();
         CallableStatement stmtMem = null;
         for (int i = 0; i < places.length(); i++) {
            stmtMem = conn.prepareCall("INSERT INTO memory (place_id, title, author, image_url, content, tags, mem_date, active) values(?,?,?,?,?,?,?,?);");
            stmtMem.setString(1, (String) places.get(i));
            stmtMem.setString(2, title);
            stmtMem.setString(3, author);
            stmtMem.setString(4, imageUrl);
            stmtMem.setString(5, content);
            StringBuilder sbTags = new StringBuilder();
            for (int j = 0; j < tags.length(); j++) {
               sbTags.append(tags.get(j));
               sbTags.append(";");
            }
            stmtMem.setString(6, sbTags.toString());
            stmtMem.setDate(7, dbDate);
            stmtMem.setBoolean(8, active);
            stmtMem.executeUpdate();
         }

         JSONObject jObjResponse = new JSONObject();
         jObjResponse.put("success", "true");

         return Response.status(201).type("application/json").entity(jObjResponse.toString()).build();
      }
      catch (Exception e) {
         System.out.println(e.getMessage());
         return Response.ok(new ErrorResponseBean(e)).build();
      }
   }

   @POST
   @Path("/response")
   @Consumes(MediaType.APPLICATION_JSON)
   @Produces(MediaType.APPLICATION_JSON)
   public Response sendResponseMemory(InputStream requestBean) {
      try {

         BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(requestBean));
         JSONObject obj = new JSONObject(bufferedReader.readLine());

         String memoryId = obj.getString("memoryId");
         String user = obj.getString("user");
         int responseId = obj.getInt("responseId");

         Connection conn = ConnectDatabase.getInstance().getConnection();
         CallableStatement stmtMem = null;

         stmtMem = conn.prepareCall("INSERT INTO response (response_id, user, memory_id) values(?,?,?);");

         stmtMem.setString(1, String.valueOf(responseId));
         stmtMem.setString(2, user);
         stmtMem.setString(3, memoryId);
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

   @POST
   @Path("/getResponse")
   @Consumes(MediaType.APPLICATION_JSON)
   @Produces(MediaType.APPLICATION_JSON)
   public Response getResponseMemory(InputStream requestBean) {
      try {

         BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(requestBean));
         JSONObject obj = new JSONObject(bufferedReader.readLine());

         int memoryId = obj.getInt("memoryId");

         Connection conn = ConnectDatabase.getInstance().getConnection();
         Statement stmt = null;
         System.out.println("Creating statement...");
         stmt = conn.createStatement();
         String sql = "SELECT * FROM response where memory_id=" + memoryId;
         ResultSet rs = stmt.executeQuery(sql);
         JSONArray jArray = new JSONArray();
         
         while (rs.next()) {
            // Retrieve by column name
            String response_id = rs.getString("response_id");
            String user = rs.getString("user");

            JSONObject jObjRes = new JSONObject();
            jObjRes.put("sender", user);
            jObjRes.put("responseId", response_id);
            jObjRes.put("date", rs.getTimestamp("response_date"));
            jArray.put(jObjRes);
            
         }
         return Response.status(201).type("application/json").entity(jArray.toString()).build();
      }
      catch (Exception e) {
         System.out.println(e.getMessage());
         return Response.ok(new ErrorResponseBean(e)).build();
      }
   }
}
