
package bean;

/**
 * @author ilkerk
 */
public class UpdateRequestBean {

   String status;

   public UpdateRequestBean() {
   }

   public String getStatus() {
      return status;
   }

   public void setStatus(String status) {
      this.status = status;
   }

   @Override
   public String toString() {
      StringBuilder s = new StringBuilder(1024);
      s.append("Class: ").append(this.getClass().getSimpleName()).append(", ");
      s.append("status: ").append(status).append(", ");
      return s.toString();
   }
}
