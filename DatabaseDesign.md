# Database design #
The database consists of 4 tables: <br />
1. User: Contains user registration data. <br />
2. Memory: Contains memory data and links to other tables.<br />
3. Response: Contains response data and links to other tables.<br />
4. Photos: Contains photo path data.<br />
<br />
## User ##
Fields:<br />
FirstName VARCHAR(30)<br />
LastName VARCHAR(50)<br />
Email VARCHAR(50)<br />
Password VARCHAR(15)<br />
<br />
Primary key: Email is the primary key.<br />
Foreign keys: None.<br />
Description: FirstName is the first name that is provided at registration. LastName is the last name that is provided at registration. Email is the email address that is provided at registration. Password is the password that is provided at registration. <br />
Other: None.<br />

## Memory ##
Fields:<br />
MemoryId INT<br />
Description TEXT<br />
LocationTags TEXT<br />
OtherTags TEXT<br />
UserEmail VARCHAR(50)<br />
Longtitude DECIMAL(10, 0)<br />
Latitude DECIMAL(10, 0)<br />
Time DATETIME<br />
TimeType INT<br />
CreateDate DATETIME<br />
PhotoId INT<br />
<br />
Primary key: MemoryId is the primary key and it will be auto-incremented when a new record is inserted.<br />
Foreign keys: UserEmail is a foreign key that references the Email column in the User table. PhotoId is a foreign key that references the PhotoId column in the Photos table.<br />
Description: Description is the field that holds the memory description. LocationTags is the field that holds the tags referring to the location of the memory. OtherTags are tags that are related to the memory content but not the location of the memory. Longtitude is the longtitude component of the exact geographical location of the memory. Latitude is the latitude component of the exact geographical location of the memory. Time is the field that holds the date and time of the memory. On its own, it does not have a meaning. It must be treated by the application in conjunction with the TimeType field.<br />
If TimeType<br />
is 1======>Only year is specified.<br />
is 2======>Year and month is specified.<br />
is 3======>Year, month and day is specified.<br />
is 4======>Year, month, day and hour is specified.<br />
is 5======>Year, month, day, hour and minute is specified.<br />
Example: Time field contains something like 1984-01-01 00:00:00 and TimeType is 1. Then the time should be displayed as 1984.<br />
Time field contains something linke 1984-02-03 10:00:00 and TimeType is 4.
Then the time should be displayed as 1984-02-03 around 10 am.<br />
Other: CreateDate and PhotoId are nullable fields.<br />
<br />
## Response ##
Fields:<br />
ResponseId INT<br />
MemoryId INT<br />
UserEmail VARCHAR(50)<br />
ResponseText VARCHAR(50)<br />
<br />
Primary key: ResponseId is the primary key and it will be auto-incremented when a new record is inserted.<br />
Foreign keys: MemoryId is a foreign key that references the MemoryId column in the Memory table. UserEmail is a foreign key that references the Email column in the User table.<br />
Description: ResponseText is the text of the pre-defined response, such as "I agree with your memory."<br />
Other: None.<br />
<br />
## Photos ##
Fields:<br />
PhotoId INT<br />
Path VARCHAR(150)<br />

Primary key: PhotoId is the primary key and it will be auto-incremented when a new record is inserted.<br />
Foreign keys: None.<br />
Description: Path is the physical or virtual path of the image file. It is a good idea to save image files in a directory instead of saving them in the database so that database size is kept small. (This could be changed.)<br />
Other: None.