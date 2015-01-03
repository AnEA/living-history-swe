
package com.dev.client.sim;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * @author Ilker Karamanli
 */
public class RestClientCreatePlace {
   public static void main(String[] args) {
      try {
         JSONObject jsonObject = new JSONObject();
         jsonObject.put("place_id", "London Bridge");
         jsonObject.put("place_name", "London2");
         jsonObject.put("latitude", "23.343534");
         jsonObject.put("longitude", "54.5345254");
         JSONArray ilkerk = new JSONArray();
         ilkerk.put("London");
         ilkerk.put("uk");
         ilkerk.put("europe");
         ilkerk.put("Earth");
         jsonObject.put("addressComponents", ilkerk);
         System.out.println(jsonObject);

         try {
            URL url = new URL("http://localhost:8080/LivingHistoryRestService/rest/place/add");
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