CREATE DATABASE livinghistory;

CREATE TABLE place
(
place_name TEXT character set utf8  NOT NULL,
place_id VARCHAR(128) NOT NULL,
latitude double NOT NULL,
longtitude double NOT NULL,
address_components TEXT character set utf8,
PRIMARY KEY (place_id)
);

Drop table place;

INSERT INTO place
(place_name, place_id, latitude, longtitude, address_components )
values
("Rome", "c201ff6d6339dac3b34184b3972b232aa097ff8a", 441.9027835, 12.496365500000024, "16;Fünfing;Fünfing bei Gleisdorf;Weiz;Steiermark;Germany;Europe");

INSERT INTO place
(place_name, place_id, latitude, longtitude,address_components)
values
("Boğaziçi Üniversitesi Kuzey Kampüsü", "bogazici_kampus", 41.085452, 29.044493999999986, "16;Fünfing;Fünfing bei Gleisdorf;Weiz;Steiermark;Germany;Europe");

INSERT INTO place
(place_name, place_id, latitude, longtitude,address_components)
values
("Oktoberfest München", "oktoberfest_munchen", 48.131785, 11.549619, "16;Fünfing;Fünfing bei Gleisdorf;Weiz;Steiermark;Germany;Europe");

INSERT INTO place
(place_name, place_id, latitude, longtitude,address_components)
values
("Biergarten", "biergarten", 48.126961, 11.621143, "16;Fünfing;Fünfing bei Gleisdorf;Weiz;Steiermark;Germany;Europe");

INSERT INTO place
(place_name, place_id, latitude, longtitude, address_components)
values
("Budapest Center", "budapest_center", 47.428473, 19.060808, "16;Fünfing;Fünfing bei Gleisdorf;Weiz;Steiermark;Germany;Europe");

-- ----------------------------------------------------------------------------

CREATE TABLE memory
(
memory_id int NOT NULL AUTO_INCREMENT,
place_id VARCHAR(64) NOT NULL,
title TEXT character set utf8,
author TEXT character set utf8 NOT NULL,
image_url TEXT character set utf8,
content TEXT character set utf8 NOT NULL,
tags TEXT character set utf8,
mem_date DATETIME NOT NULL,
active boolean NOT NULL,
PRIMARY KEY (memory_id)
);

drop table memory;

INSERT INTO memory
(place_id, title, author, image_url, content, tags, mem_date,active)
values(
"bogazici_kampus", "First Title" ,"Aydin Krtil", "https://static.panoramio.com.storage.googleapis.com/photos/1920x1280/83817590.jpg","Eskiden buralarda kar vardı.", "bogazici;snow;night;fun", '2014-11-03 00:00:01', TRUE
);

INSERT INTO memory
(place_id, title, author, image_url, content, tags, mem_date,active)
values(
"bogazici_kampus", "Second Title" ,"Rıza Başaran", "https://static.panoramio.com.storage.googleapis.com/photos/1920x1280/84588762.jpg","Çok üşüyorduk", "bogazici;snow;winter;snostorm", '2013-11-03 00:00:01', TRUE
);

INSERT INTO memory
(place_id, title, author, image_url, content, tags, mem_date,active)
values(
"oktoberfest_munchen","Third Title" , "Hans", "http://www.bigeales.com/wp-content/uploads/2014/01/Waitress-photo.jpg","Das Oktoberfest in München (mundartlich Wiesn) ist das größte Volksfest der Welt. Es findet seit 1810 auf der Theresienwiese in der bayerischen Landeshauptstadt München statt und wird Jahr für Jahr von rund sechs Millionen Menschen besucht; 2012 waren es 6,4 Millionen Besucher.[1] Für das Oktoberfest brauen die Münchner Brauereien ein spezielles Bier, das eine Stammwürze von mindestens 13,5 % aufweisen muss[2] und folglich mehr Alkohol als gewöhnliches Vollbier enthält (2013 zwischen 5,8 und 6,4", "oktoberfest;beer;biergarten", '2006-11-03 00:00:01', TRUE
);

INSERT INTO memory
(place_id, title, author, image_url, content, tags, mem_date,active)
values(
"biergarten", "Fourth Title" ,"Julia", "http://www.hotel-rothof.de/wcms/Clients/134201037051031/Images/106351201042061116.jpg","Im weiteren Sinn wird die Bezeichnung „Biergarten“ auch für andere gastronomische Einrichtungen im Freien verwendet, die in Bayern und in Österreich „Wirtsgarten“ oder „Gastgarten“ genannt werden.", "oktoberfest;munchen;beer;fun", '2011-11-03 00:00:01', TRUE
);

INSERT INTO memory
(place_id, title, author, image_url, content, tags, mem_date,active)
values(
"budapest_center", "Fifth Title" ,"John", "http://www.stag-budapest.com/images/katakt/Beer%20bike%20in%20Budapest.jpg","A sör (vagy régiesen ser, serital) (a Magyar Élelmiszerkönyv szerint) malátából, valamint bizonyos pótanyagokból vízzel cefrézett, komlóval, illetve egyéb engedélyezett anyagokkal ízesített, sörélesztővel erjesztett, szén-dioxidban dús, alkoholtartalmú ital.", "budapest;beer;beerbike", '2010-11-03 00:00:01', TRUE
);

-- ----------------------------------------------------------------------------

CREATE TABLE userinfo
(
id int NOT NULL AUTO_INCREMENT,
nameinfo VARCHAR(64) NOT NULL,
email TEXT character set utf8  NOT NULL,
passwordinfo TEXT character set utf8,
PRIMARY KEY (id)
);


select memory.memory_id , memory.place_id , place.place_name, memory.author ,
memory.image_url, memory.content , memory.tags , memory.mem_date , memory.active
from place inner join memory on place.place_id = memory.place_id where
tags like '%snow%';

CREATE TABLE response
(
response_id int NOT NULL,
user TEXT character set utf8  NOT NULL,
memory_id int,
response_date DATETIME NOT NULL,
PRIMARY KEY (response_id),
FOREIGN KEY (memory_id) REFERENCES memory(memory_id)
);

drop table response;

INSERT INTO response
(response_id, user, memory_id, response_date)
values(
103, "John Test", 4
);

SELECT VERSION();



