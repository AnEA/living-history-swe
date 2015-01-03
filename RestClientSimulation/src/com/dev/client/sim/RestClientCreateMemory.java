
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
public class RestClientCreateMemory {

   public static void main(String[] args) {
      try {

         JSONObject jsonObject = new JSONObject();
         
         jsonObject.put("author", "ilkerk");
         jsonObject.put("title", "My Test Memory Title");
         jsonObject.put("email", "ilkerk@ilkerk.com");
         jsonObject.put("imageUrl", "http://www.stag-budapest.com/images/katakt/Beer%20bike%20in%20Budapest.jpg");
         jsonObject.put("content", "A sör (vagy régiesen ser, serital) (a Magyar Élelmiszerkönyv szerint) malátából");
         JSONArray ilkerk = new JSONArray();
         ilkerk.put("beerbike");
         ilkerk.put("budapest");
         ilkerk.put("beer");
         jsonObject.put("tags", ilkerk);
         jsonObject.put("date", "2014-11-03 00:00:01");
         jsonObject.put("active", "TRUE");
         JSONArray ilkerk2 = new JSONArray();
         ilkerk2.put("32c342ec5e45f0a91b0fea8c2551fb0ee9e0dee4");
         ilkerk2.put("32dsd2kjkdsakjk2kjkjdksdkjkdjsk2");
         ilkerk2.put("ilkerksd2kjkdsakjk2kjkjdksdkjkdjsk2");
         jsonObject.put("places", ilkerk2);
         System.out.println(jsonObject);

         try {
            URL url = new URL("http://localhost:8080/LivingHistoryRestService/rest/memory/create");
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