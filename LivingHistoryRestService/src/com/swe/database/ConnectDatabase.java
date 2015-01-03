
package com.swe.database;

import java.sql.*;

/**
 * @author Ilker Karamanli
 * @Summary ConnectDatabase Singleton
 */
public class ConnectDatabase {
   private static ConnectDatabase instance;
   // Local DB Connection Provided for now!!

//   private static String          DB_URL      = "jdbc:mysql://localhost:3306/livinghistory";
//   private static String          DB_USER     = "root";
//   private static String          DB_PASSWORD = "Er72142167";

//    private static String DB_URL = "jdbc:mysql://localhost:3306/fall2014";
//    private static String DB_USER = "fall2014";
//    private static String DB_PASSWORD = "fall2014g1hjk";
   
 private static String DB_URL = "jdbc:mysql://localhost:3306/fall2014";
 private static String DB_USER = "root";
 private static String DB_PASSWORD = "swe574";

   private ConnectDatabase() {
      try {
         Class.forName("com.mysql.jdbc.Driver");
      }
      catch (ClassNotFoundException e) {
         System.err.println(e.getMessage());
      }
   }

   public static ConnectDatabase getInstance() {
      if (instance == null) {
         instance = new ConnectDatabase();
      }
      return instance;
   }

   public Connection getConnection() throws SQLException, ClassNotFoundException {
      Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
      return connection;
   }
}
