package com.dev.client.sim;


import java.io.BufferedReader;
 
import java.io.InputStreamReader;
 
import java.io.OutputStreamWriter;
 
import java.net.URL;
 
import java.net.URLConnection; 

import org.json.simple.JSONObject;

class JsonEncodeDemo 
{
   public static void main(String[] args) 
   {
      JSONObject obj = new JSONObject();

      obj.put("name", "new name");
      obj.put("number", new Integer(100));
      obj.put("Boolean", new Boolean(true));

      System.out.print(obj);
   }
}