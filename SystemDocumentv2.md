# SWE 574 Software Development as a Team, Fall 2014 #
# Instructor: Suzan Üsküdarlı #



# WBLH: Web Based Living History Application #
# System Description Document #

## 04.01.2015 ##
## [Revision 2](https://code.google.com/p/living-history-swe/source/detail?r=2) ##


Revision:    1.0

Date:        03.01.2015

Explanation: Initial Documentation for System Description


Revision:    2.0

Date:        04.01.2015

Explanation:  Modifications on Section 3,  Modifications on Section 5



TABLE of CONTENTS

1. INTRODUCTION

2. DATA MODEL

3. TECHNOLOGY

4. ACCESS, AUTHENTICATION and AUTHORISATION

5. DELIVERY

6. DOCUMENTATION



## 1. INTRODUCTION ##

This system description document is a documentation describing the technology choices and the environment used in the creation & deployment of Living History application.
Living History application is an application used for entering/viewing/responding to memories. The application has 3 aspects: database, server & client.


## 2. DATA MODEL ##

Database design of the system can be seen on the odf and doc versions of this document under https://code.google.com/p/living-history-swe/source/browse/#git%2Fdocs%2Fdeliverables


## 3. TECHNOLOGY ##


> AngularJS MVC framework  		Client side code

> GruntJS					Front end build tool

> Java					Programming language for server side

> MySQL					Database implementations

> Heroku					Cloud application platform

> Apache TomCat				Web server

> Javascript API for Google Maps V3	Visualisation of the maps in application

> Apache Cordova			Platform to build mobile applications using web application

code

> JavaScript, HTML			Web programming languages

> Node.JS			  		Platform to build server-side/network application

(Used for Android version in this project)

> Eclipse Mars				Development tool for server side

> Webstorm 9.0				Development tool for client side

> Google Chrome Developer 		Tool for debugging on client side

> Apiary					Platform for building & consuming Web APIs

> Amazon Web Services			Cloud platform with Tomcat & MySQL for testing

> Google Code				 Google’s web based environment for collaborative code

development projects

> Automated deployment 		Not available



## 4. ACCESS, AUTHENTICATION and AUTHORISATION ##

•	The access to the application is Web based.

•	Authentication is through a Web form where email address & password information of the user is required.



## 5. DELIVERY ##

The application is delivered to the customer in 2 ways:

> CD

> Web Portal given below:

http://ec2-54-72-10-88.eu-west-1.compute.amazonaws.com:8080/LivingHistoryRestService/www/index.html



## 6. DOCUMENTATION ##

All detailed documentation regarding the Living History project can be found at Google code pages from the following address:

https://code.google.com/p/living-history-swe/w/list