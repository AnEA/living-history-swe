
package com.ws;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import bean.ErrorResponseBean;
import bean.UpdateResponseBean;

@Stateless
@Path("/memory")
public class MemoryResource {

   @POST
   @Path("/get")
   @Consumes(MediaType.APPLICATION_JSON)
   @Produces(MediaType.APPLICATION_JSON)
   public Response getPerson(InputStream requestBean) {
      try {
         // TODO get db connection
         BufferedReader ilkerk = new BufferedReader(new InputStreamReader(requestBean));
         System.out.println(ilkerk.readLine());

         // get data, send response
         UpdateResponseBean responseBean = new UpdateResponseBean();
         responseBean.setName("Boğaziçi Üniversitesi Kuzey Kampüsü");
         responseBean.setPlaceID("bogazici_kampus");
         responseBean.setLatitude("41.085452");
         responseBean.setLongitude("29.044493999999986");
         responseBean.setMemories("author");
         // insert update to db
         System.out.println(responseBean.toString());
         return Response.ok(responseBean.toString()).build();
      }
      catch (Exception e) {
         return Response.ok(new ErrorResponseBean(e)).build();
      }
   }

}
