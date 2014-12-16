
package com.dev.client.sim;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;

import org.json.JSONObject;

/**
 * @author Ilker Karamanli
 */
public class RestClientCreateMemory {

   public static void main(String[] args) {
      try {

         JSONObject jsonObject = new JSONObject();
         jsonObject.put("place_id", "Berlin3");
         jsonObject.put("author", "ilkerk");
         jsonObject.put("imageUrl", "http://www.stag-budapest.com/images/katakt/Beer%20bike%20in%20Budapest.jpg");
         jsonObject.put("content", "A sör (vagy régiesen ser, serital) (a Magyar Élelmiszerkönyv szerint) malátából");
         jsonObject.put("tags", "beer;budapest,beerbike");
         jsonObject.put("date", "2014-11-03 00:00:01");
         jsonObject.put("active", "TRUE");
         System.out.println(jsonObject);

         try {
            URL url = new URL("http://localhost:8080/LivingHistoryRestService/rest/memory/creatememory");
            URLConnection connection = url.openConnection();
            connection.setDoOutput(true);
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setConnectTimeout(5000);
            connection.setReadTimeout(5000);
            OutputStreamWriter out = new OutputStreamWriter(connection.getOutputStream());
            out.write(jsonObject.toString());
            out.close();

            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));

            System.out.println(in.readLine());
            while (in.readLine() != null) {

            }
            System.out.println("\nREST Service Invoked Successfully..");
            in.close();
         }
         catch (Exception e) {
            System.out.println("\nError while calling REST Service");
            System.out.println(e);
         }
      }
      catch (Exception e) {
         e.printStackTrace();
      }
   }
}