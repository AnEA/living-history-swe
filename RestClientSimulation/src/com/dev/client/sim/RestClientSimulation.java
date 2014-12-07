
package com.dev.client.sim;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;

import org.json.JSONObject;

/**
 * @author ilkerk
 * @summary Client Simulation of RestFul
 */

public class RestClientSimulation {
   public static void main(String[] args) {
      // String string = "";
      try {

         // InputStream inputStream = new FileInputStream("/Users/yikaraman/Desktop/JSONFile.txt");
         // InputStreamReader isReader = new InputStreamReader(inputStream);
         // BufferedReader br = new BufferedReader(isReader);
         // String line;
         // while ((line = br.readLine()) != null) {
         // string += line + "\n";
         // }

         // JSONObject jsonObject = new JSONObject(string);
         JSONObject jsonObject = new JSONObject();
         jsonObject.put("status", "Hellooo");
         System.out.println(jsonObject);

         try {
            URL url = new URL("http://localhost:8080/LivingHistoryRestService/rest/memory/get");
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

         // br.close();
      }
      catch (Exception e) {
         e.printStackTrace();
      }
   }
}
