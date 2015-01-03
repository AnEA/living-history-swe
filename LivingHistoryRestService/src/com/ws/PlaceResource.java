
package com.ws;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.CallableStatement;
import java.sql.Connection;

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
 * @Summary Place specific data handled here.
 */
@Stateless
@Path("/place")
public class PlaceResource {

   @POST
   @Path("/add")
   @Consumes(MediaType.APPLICATION_JSON)
   @Produces(MediaType.APPLICATION_JSON)
   public Response createPlace(InputStream requestBean) {
      try {

         BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(requestBean));
         JSONObject obj = new JSONObject(bufferedReader.readLine());
         String place_id = obj.getString("place_id");
         String place_name = obj.getString("place_name");
         double latitude = obj.getDouble("latitude");
         double longitude = obj.getDouble("longitude");
         JSONArray address_components = (JSONArray) obj.get("addressComponents");

         Connection conn = ConnectDatabase.getInstance().getConnection();
         CallableStatement stmtMem = null;
         stmtMem = conn.prepareCall("INSERT INTO place (place_name, place_id, latitude, longtitude,address_components) values(?,?,?,?,?);");
         stmtMem.setString(1, place_name);
         stmtMem.setString(2, place_id);
         stmtMem.setDouble(3, latitude);
         stmtMem.setDouble(4, longitude);
         
         StringBuilder sbAC = new StringBuilder();
         for (int j = 0; j < address_components.length(); j++) {
            sbAC.append(address_components.get(j));
            sbAC.append(";");
         }
         stmtMem.setString(5, sbAC.toString());
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
   @Path("/update")
   @Consumes(MediaType.APPLICATION_JSON)
   @Produces(MediaType.APPLICATION_JSON)
   public Response updatePlaceName(InputStream requestBean) {
      try {

         BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(requestBean));
         JSONObject obj = new JSONObject(bufferedReader.readLine());
         String place_id = obj.getString("place_id");
         String place_name = obj.getString("place_name");

         Connection conn = ConnectDatabase.getInstance().getConnection();
         CallableStatement stmtMem = null;
         stmtMem = conn.prepareCall("update place set place_name='" + place_name + "' where place_id='" + place_id + "'");
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
