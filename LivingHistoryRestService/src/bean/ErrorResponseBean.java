
package bean;

import java.lang.reflect.Field;

/**
 * @author Ilker Karamanli
 * @Summary ErrorBean
 */
public class ErrorResponseBean {

   String message;

   public ErrorResponseBean(Exception e) {
      this.message = e.getMessage();
   }

   public String getMessage() {
      return message;
   }

   public void setMessage(String message) {
      this.message = message;
   }

   public String toJsonString() {
      StringBuilder s = new StringBuilder(1024);
      Field[] fields = ErrorResponseBean.this.getClass().getDeclaredFields();
      s.append("{");
      for (Field f : fields) {
         s.append("\"");
         s.append(f.getName());
         s.append("\":\"");
         try {
            s.append(f.get(this));
         }
         catch (Exception ex) {
            return null;
         }
         s.append("\"");
      }
      s.append("}");

      return s.toString();
   }

   @Override
   public String toString() {
      StringBuilder s = new StringBuilder(1024);
      s.append("Class: ").append(this.getClass().getSimpleName()).append(", ");
      s.append(super.toString()).append(", ");
      s.append("message: ").append(message);
      return s.toString();
   }
}
