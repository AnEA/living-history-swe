
package com.ws;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.JSONObject;

import bean.ErrorResponseBean;

import com.swe.database.ConnectDatabase;

/**
 * @author Ilker Karamanli
 * @Summary Memory specific data handled here.
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
         String latitude = obj.getString("latitude");
         String longitude = obj.getString("longitude");

         Connection conn = ConnectDatabase.getInstance().getConnection();
         CallableStatement stmtMem = null;
         stmtMem = conn.prepareCall("INSERT INTO place (placeName, place_id, latitude, longtitude) values(?,?,?,?);");
         stmtMem.setString(1, place_name);
         stmtMem.setString(2, place_id);
         stmtMem.setString(3, latitude);
         stmtMem.setString(4, longitude);
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
