
package bean;

/**
 * @author ilkerk
 */
public class UpdateResponseBean {

   String name;
   String placeID;
   String latitude;
   String longitude;
   String memories;

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   public String getPlaceID() {
      return placeID;
   }

   public void setPlaceID(String placeID) {
      this.placeID = placeID;
   }

   public String getLatitude() {
      return latitude;
   }

   public void setLatitude(String latitude) {
      this.latitude = latitude;
   }

   public String getLongitude() {
      return longitude;
   }

   public void setLongitude(String longitude) {
      this.longitude = longitude;
   }

   public String getMemories() {
      return memories;
   }

   public void setMemories(String memories) {
      this.memories = memories;
   }

   public UpdateResponseBean() {
   }

   @Override
   public String toString() {
      StringBuilder s = new StringBuilder(1024);
      s.append("Class: ").append(this.getClass().getSimpleName()).append(", ");
      s.append(super.toString()).append(", ");
      s.append("Name: ").append(name).append(", ");
      s.append("placeID: ").append(placeID).append(", ");
      s.append("latitude: ").append(placeID).append(", ");
      s.append("longitude: ").append(placeID).append(", ");
      s.append("memories: ").append(memories).append(", ");
      return s.toString();
   }
}
