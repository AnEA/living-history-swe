
package com.ws;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;

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

@Stateless
@Path("/user")
public class UserResource {

   @POST
   @Path("/create")
   @Consumes(MediaType.APPLICATION_JSON)
   @Produces(MediaType.APPLICATION_JSON)
   public Response createUser(InputStream requestBean) {
      try {

         // If you need to get data from request, you can parse here.
         BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(requestBean));
         JSONObject obj = new JSONObject(bufferedReader.readLine());
         String email = obj.getString("email");
         String name = obj.getString("name");
         String password = obj.getString("password");

         Connection conn = ConnectDatabase.getInstance().getConnection();
         CallableStatement stmtMem = null;
         stmtMem = conn.prepareCall("INSERT INTO userinfo (nameinfo, email, passwordinfo) values(?,?,?);");
         stmtMem.setString(1, name);
         stmtMem.setString(2, email);
         stmtMem.setString(3, password);
         int row = stmtMem.executeUpdate();
         return Response.ok(obj.toString()).build();
      }
      catch (Exception e) {
         System.out.println(e.getMessage());
         return Response.ok(new ErrorResponseBean(e)).build();
      }
   }

   @POST
   @Path("/get")
   @Consumes(MediaType.APPLICATION_JSON)
   @Produces(MediaType.APPLICATION_JSON)
   public Response getUser(InputStream requestBean) {
      try {

         // If you need to get data from request, you can parse here.
         BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(requestBean));
         JSONObject obj = new JSONObject(bufferedReader.readLine());
         String email = obj.getString("email");
         String password = obj.getString("password");

         Connection conn = ConnectDatabase.getInstance().getConnection();
         CallableStatement stmtMem = null;
         stmtMem = conn.prepareCall("select * FROM userinfo where email='" + email + "' and passwordinfo='" + password + "';");
         ResultSet rs = stmtMem.executeQuery();
         boolean login = false;
         while (rs.next()) {
            String dbUsername = rs.getString("email");
            String dbPassword = rs.getString("passwordinfo");

            if (dbUsername.equals(email) && dbPassword.equals(password)) {
               System.out.println("OK");
               login = true;
            }
         }
         if (login) {
            return Response.ok(obj.toString()).build();
         }
         else {
            return Response.status(403).type("application/json").entity("Forbidden").build();
         }

      }
      catch (Exception e) {
         System.out.println(e.getMessage());
         return Response.ok(new ErrorResponseBean(e)).build();
      }
   }
}
