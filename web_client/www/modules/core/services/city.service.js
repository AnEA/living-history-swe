'use strict';

// jshint ignore: start

angular.module('core').factory('CityService', ['Restangular', '$q', '$timeout',
    function (Restangular, $q, $timeout) {

        var cities = [{
            "name": "Boğaziçi Üniversitesi Kuzey Kampüsü",
            "place_id": "bogazici_kampus",
            "latitude": 41.085452,
            "longitude": 29.044493999999986,
            "memories": [{
                "author": "Aydın Kırtıl",
                "imageUrl": "https://static.panoramio.com.storage.googleapis.com/photos/1920x1280/83817590.jpg",
                "content": "Eskiden buralarda kar vardı.",
                "tags": ["bogazici", "snow", "night", "fun"],
                "date": "1413136221930",
                "active": true
            }, {
                "author": "Rıza Başaran",
                "imageUrl": "https://static.panoramio.com.storage.googleapis.com/photos/1920x1280/84588762.jpg",
                "content": "Çok üşüyorduk",
                "tags": ["bogazici", "winter", "snow", "snowstorm"],
                "date": "1413136242988",
                "active": true
            }]
        }, {
            "name": "Oktoberfest München",
            "place_id": "oktoberfest_munchen",
            "latitude": 48.131785,
            "longitude": 11.549619,
            "memories": [{
                "author": "Hans",
                "imageUrl": "http://www.bigeales.com/wp-content/uploads/2014/01/Waitress-photo.jpg",
                "content": "Das Oktoberfest in München (mundartlich Wiesn) ist das größte Volksfest der Welt. Es findet seit 1810 auf der Theresienwiese in der bayerischen Landeshauptstadt München statt und wird Jahr für Jahr von rund sechs Millionen Menschen besucht; 2012 waren es 6,4 Millionen Besucher.[1] Für das Oktoberfest brauen die Münchner Brauereien ein spezielles Bier, das eine Stammwürze von mindestens 13,5 % aufweisen muss[2] und folglich mehr Alkohol als gewöhnliches Vollbier enthält (2013 zwischen 5,8 und 6,4",
                "tags": ["oktoberfest", "munchen", "beer", "fun"],
                "date": "2012-04-23T18:25:43.511Z",
                "active": true
            }]
        }, {
            "name": "Biergarten",
            "place_id": "biergarten",
            "latitude": 48.126961,
            "longitude": 11.621143,
            "memories": [{
                "author": "Julia",
                "imageUrl": "http://www.hotel-rothof.de/wcms/Clients/134201037051031/Images/106351201042061116.jpg",
                "content": "Im weiteren Sinn wird die Bezeichnung „Biergarten“ auch für andere gastronomische Einrichtungen im Freien verwendet, die in Bayern und in Österreich „Wirtsgarten“ oder „Gastgarten“ genannt werden.",
                "tags": ["oktoberfest", "beer", "biergarten"],
                "date": "2014-10-19T22:27:45.715Z",
                "active": true
            }]
        }, {
            "name": "Budapest Center",
            "place_id": "budapest_center",
            "latitude": 47.428473,
            "longitude": 19.060808,
            "memories": [{
                "author": "John",
                "imageUrl": "http://www.stag-budapest.com/images/katakt/Beer%20bike%20in%20Budapest.jpg",
                "content": "A sör (vagy régiesen ser, serital) (a Magyar Élelmiszerkönyv szerint) malátából, valamint bizonyos pótanyagokból vízzel cefrézett, komlóval, illetve egyéb engedélyezett anyagokkal ízesített, sörélesztővel erjesztett, szén-dioxidban dús, alkoholtartalmú ital.",
                "tags": ["beer", "budapest", "beerbike"],
                "date": "2012-04-23T18:25:43.511Z",
                "active": true
            }]
        }];

        var CityService = {
            getMemoriesOfCity: function (city) {
                var deferred = $q.defer();

                $timeout(function () {
                    deferred.resolve(cities);
                }, 100);

                return deferred.promise;
            }
        };

        return CityService;
    }
]);