# Meeting Minutes _(December 1st, 2014)_ #


## Meeting Type ##
Face to face meeting at school (Kahve Diyarı)

## Topic ##
9th Team Discussion on the SWE 574 Project Improvement

## Agenda ##

• Discussions on the implementation of backend

• Discussions on the database design

• Brainstorming on the android version of the client demo


## Meeting Notes ##

• Erman & Michael have worked on the Android version of the client.
They tried to push the client onto the Android device but it crashed.  So they have decided to run it using the emulator.   They have also resolved the resolution issues.

• Ilker & Eser have discussed on the backend operations.
There was a change of decision:  Jersey Json will be used instead of  Restlet.
lker has written the code in order to respond to incoming Json requests in Java. He has tried to use the best method in order to give responses in a suitable way.


Eser is working on the code for adding DbConnection.

• Eser has reviewed the initial database design.  Some unnecessary items (such as the TimeType and Comment tables)  will be deleted from the database design.

• Kazim has decided to use data scraper instead of data crawler.  For visualisation  and/or parsing data, the Sgvizler SPARQL Javascript library will be used (http://dev.data2000.no/sgvizler/)


## Action Items ##

Following actions and task assignments have been set:

• Erman & Michael will work on the Android client in order to meet the 3rd milestone’s deadline which is 8th of December.

They will work on and complete the following:
-	 Verify hybrid user experience
-	 Verify all existing functionality

• Eser will get info from Onat regarding the database URLs.  The queries for insert and delete functions will be reviewed and created.

• Halil will provide Eser with the data & information that is used for add, delete, update and login.
The values, keys and URLs are needed by the backend team.

• Onat will be updating the database design.  . Time format will be stored in Memory table.  Email address will be used as the unique key. The new design will be shared with team members and will be uploaded to Wiki.  He will prepare the necessary database URLs & queries.

• Ilker will start the deployment to server after Onat’s part on the database is complete.  He is going to write the beans where the behaviors exist according to the specific queries that will come from Halil.

• Eser will complete the code for adding the DbConnection in MySql.

## Next Meeting ##
Will be held in Kahve Dunyası at 18:00 on 08.12.2014



## Next Meeting Agenda Items ##

• Brainstorming on latest form of  Android client

• Review of implementations regarding backend which have been done so far

• Discussions on google code page posts & issues