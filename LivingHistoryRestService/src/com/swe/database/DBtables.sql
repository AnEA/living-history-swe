CREATE DATABASE livinghistory;

SELECT livinghistory;

CREATE TABLE place
(
placeName TEXT character set utf8  NOT NULL,
place_id VARCHAR(20) NOT NULL,
latitude double NOT NULL,
longtitude double NOT NULL,
PRIMARY KEY (place_id)
);

Drop table place;

INSERT INTO place
(placeName,place_id, latitude, longtitude)
values
("Boğaziçi Üniversitesi Kuzey Kampüsü", "bogazici_kampus", 41.085452, 29.044493999999986 );

INSERT INTO place
(placeName,place_id, latitude, longtitude)
values
("Oktoberfest München", "oktoberfest_munchen", 48.131785, 11.549619);

INSERT INTO place
(placeName,place_id, latitude, longtitude)
values
("Biergarten", "biergarten", 48.126961, 11.621143);

INSERT INTO place
(placeName,place_id, latitude, longtitude)
values
("Budapest Center", "budapest_center", 47.428473, 19.060808);


CREATE TABLE memory
(
id int NOT NULL AUTO_INCREMENT,
place_id VARCHAR(64) NOT NULL,
author TEXT character set utf8  NOT NULL,
image TEXT character set utf8,
content TEXT character set utf8 NOT NULL,
tags TEXT character set utf8,
mem_date DATETIME NOT NULL,
active boolean NOT NULL,
PRIMARY KEY (id)
);

drop table memory;

INSERT INTO memory
(place_id,author,image, content, tags,mem_date,active)
values(
"bogazici_kampus", "Aydin Krtil", "https://static.panoramio.com.storage.googleapis.com/photos/1920x1280/83817590.jpg","Eskiden buralarda kar vardı.", "bogazici;snow;night;fun", '2014-11-03 00:00:01', TRUE
);

INSERT INTO memory
(place_id,author,image, content, tags,mem_date,active)
values(
"bogazici_kampus", "Rıza Başaran", "https://static.panoramio.com.storage.googleapis.com/photos/1920x1280/84588762.jpg","Çok üşüyorduk", "bogazici;snow;winter;snostorm", '2013-11-03 00:00:01', TRUE
);


INSERT INTO memory
(place_id,author,image, content, tags,mem_date,active)
values(
"oktoberfest_munchen", "Hans", "http://www.bigeales.com/wp-content/uploads/2014/01/Waitress-photo.jpg","Das Oktoberfest in München (mundartlich Wiesn) ist das größte Volksfest der Welt. Es findet seit 1810 auf der Theresienwiese in der bayerischen Landeshauptstadt München statt und wird Jahr für Jahr von rund sechs Millionen Menschen besucht; 2012 waren es 6,4 Millionen Besucher.[1] Für das Oktoberfest brauen die Münchner Brauereien ein spezielles Bier, das eine Stammwürze von mindestens 13,5 % aufweisen muss[2] und folglich mehr Alkohol als gewöhnliches Vollbier enthält (2013 zwischen 5,8 und 6,4", "oktoberfest;beer;biergarten", '2006-11-03 00:00:01', TRUE
);

INSERT INTO memory
(place_id,author,image, content, tags,mem_date,active)
values(
"biergarten", "Julia", "http://www.hotel-rothof.de/wcms/Clients/134201037051031/Images/106351201042061116.jpg","Im weiteren Sinn wird die Bezeichnung „Biergarten“ auch für andere gastronomische Einrichtungen im Freien verwendet, die in Bayern und in Österreich „Wirtsgarten“ oder „Gastgarten“ genannt werden.", "oktoberfest;munchen;beer;fun", '2011-11-03 00:00:01', TRUE
);

INSERT INTO memory
(place_id,author,image, content, tags,mem_date,active)
values(
"budapest_center", "John", "http://www.stag-budapest.com/images/katakt/Beer%20bike%20in%20Budapest.jpg","A sör (vagy régiesen ser, serital) (a Magyar Élelmiszerkönyv szerint) malátából, valamint bizonyos pótanyagokból vízzel cefrézett, komlóval, illetve egyéb engedélyezett anyagokkal ízesített, sörélesztővel erjesztett, szén-dioxidban dús, alkoholtartalmú ital.", "budapest;beer;beerbike", '2010-11-03 00:00:01', TRUE
);

CREATE TABLE userinfo
(
id int NOT NULL AUTO_INCREMENT,
nameinfo VARCHAR(64) NOT NULL,
email TEXT character set utf8  NOT NULL,
passwordinfo TEXT character set utf8,
PRIMARY KEY (id)
);
