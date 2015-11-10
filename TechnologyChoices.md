## Technology Choices ##

### Client ###

We are using AngularJS MVC framework for client side code. It is built via GruntJS and deployed on Heroku. Javascript API for Google Maps V3 is used for maps visualisation.

[AngularJS](https://angularjs.org)
[GruntJS](http://gruntjs.com)
[Heroku](https://www.heroku.com)
[Google Maps API](https://developers.google.com/maps/documentation/javascript/)

### Server ###

#### Design Details ####

RESTful Web Services use HTTP protocol methods. The HTTP methods such as GET, POST and DELETE can be mapped to create, read, update and delete (CRUD) actions to be performed. Java specification, JAX-RS (JSR 311) is an example that provides an API for creating RESTful web services in Java.

In this project, the fundamental steps are,
  * Create a Java client application to consume RESTful Web Services.
  * Implement CRUD operations on the Database using RESTful Web Services.

#### Design Consideration 1: JSR-000353 Java API for JSON Processing ####

The Java API for JSON Processing provides portable APIs to parse, generate, transform, and query JSON using the streaming API or the object model API.

The Streaming API provides a way to parsing and generation of JSON in a streaming fashion. It hands over parsing and generation control to developer. The streaming model is adequate for local processing where random access of other parts of the data is not required. Similarly, the streaming API provides a way to generate well-formed JSON to a stream by writing one event at a time.
The object model API creates a random access tree-like structure that represents the JSON data in memory. The tree can then be navigated and queried. This programming model is the most flexible and enables processing that requires random access to the complete contents of the tree. However, it is often not as efficient as the streaming model and requires more memory.

#### The Streaming API ####

The streaming API is similar to the StAX API for XML and consists of the interfaces JsonParser and JsonGenerator. JsonParser contains methods to parse JSON data using the streaming model. JsonGenerator contains methods to write JSON data to an output source.
JsonParser provides forward, read-only access to JSON data using the pull parsing programming model. In this model the application, code controls the thread and calls methods in the parser interface to move the parser forward or to obtain JSON data from the current state of the parser.
JsonGenerator provides methods to write JSON to a stream. The generator writes name/value pairs in JSON objects and values in JSON arrays.
The streaming API is a low-level API designed to process large amounts of JSON data efficiently. Other JSON frameworks (such as JSON binding) can be implemented using this API.

#### The Object Model API ####

The object model API is similar to the DOM API for XML. A high-level API provides immutable object models for JSON object and array structures. These JSON structures are represented as object models using the Java types JsonObject and JsonArray. JsonObject provides a Map view to access the unordered collection of zero or more name/value pairs from the model.

#### Design Consideration 2: Restlet ####

Restlet Framework is the leading RESTful web API framework for Java. Its unique Java API is available on both client and server sides. Suitable for both client-side and server-side web applications. The innovation is that that it uses the same API, reducing the learning curve and the software footprint. Tunneling service lets browsers issue any HTTP method (PUT, DELETE, MOVE, etc.) through a simple HTTP POST. This service is transparent for Restlet applications. It is ready for the Semantic Web (Web 3.0), with full RDF reading and writing support.


#### Design Consideration 3: Jersey Json ####

Jersey Json is used for developing RESTful Web services that support the exposing of data in a variety of representation media types and abstract away the low-level details of the client-server communication  In order to simplify development of RESTful Web services and their clients in Java, a standard and portable JAX-RS API has been designed. Jersey RESTful Web Services framework is open source, production quality, framework for developing RESTful Web Services in Java that provides support for JAX-RS APIs and serves as a JAX-RS (JSR 311 & JSR 339) Reference Implementation.

Jersey framework is more than the JAX-RS Reference Implementation. Jersey provides it’s own API that extend the JAX-RS toolkit with additional features and utilities to further simplify RESTful service and client development. Jersey also exposes numerous extension SPIs so that developers may extend Jersey to best suit their needs.

Goals of Jersey project can be summarized in the following points:

Track the JAX-RS API and provide regular releases of production quality Reference Implementations that ships with GlassFish;
Provide APIs to extend Jersey & Build a community of users and developers; and finally
Make it easy to build RESTful Web services utilising Java and the Java Virtual Machine.
The latest stable release of Jersey is 2.13.
