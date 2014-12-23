
package com.swe.sendmail;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class sendEmail {

   public void sendmail(String to, String newPassword) {

      // Get system properties object
      Properties properties = System.getProperties();

      String from = "yigitboun@gmail.com";

      String emailCreate = "<p>Hi <br />You have just joined the world's largest community of Living History. <br /> " +

      "<p>Now, you\'ll have full access to website and future notifications will be sent to this email address.</p>" +

      "Your new Password is: " + newPassword + 
      
      "<p>Thanks for joining us!<br />" + "Support Team<br /> SWE574 </p>";

      // Setup mail server
      String SMTP_HOST = "smtp.gmail.com"; // Use Gmail's SMTP Host.
      String SMTP_PORT = "587"; // Use Gmail's Port Number for SMTP.
      properties.put("mail.smtp.starttls.enable", "true");
      properties.setProperty("mail.smtp.host", SMTP_HOST);
      properties.setProperty("mail.smtp.port", SMTP_PORT);
      properties.put("mail.smtp.auth", "true");

      // Get the default Session object.
      Session mailSession = Session.getDefaultInstance(properties, new GMailAuthenticator(from, "RAPtor1234"));

      try {
         // Create a default MimeMessage object.
         MimeMessage message = new MimeMessage(mailSession);
         // Set From: header field of the header.
         message.setFrom(new InternetAddress(from));
         // Set To: header field of the header.
         message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
         // Set Subject: header field
         message.setSubject("Welcome to Voting System!");
         // Now set the actual message
         // message.setText(messageBody);
         message.setContent(emailCreate, "text/html");
         // Send message
         Transport.send(message);
         //System.out.println("Sent message successfully....");
      }
      catch (MessagingException mex) {
         mex.printStackTrace();
         //System.out.println("Error: unable to send message....");
      }

   }

}
