var app = require("../express");

var q = require("q");
const https = require("https");

app.get('/find/events', searchEvent);

var appKey = "162d592f5c53704651484b4c2c104f23";

function searchEvent(req, res) {
    var text = req.query.text;
    apiSearchQuery(text)
        .then(function (response) {
            res.json(response);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function apiSearchQuery(text) {
    var deferred = q.defer();
    https.get({
        host: 'api.meetup.com',
        path: '/find/events?key='+appKey+'&sign=true&format=json&text='+text,
        headers: {
            "Accept": "application/json",
            "app_key": appKey
        }
    }, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            } catch(e) {
                deferred.reject({error: e});
            }
        });
    });
    return deferred.promise;
}


// function oxfordSearchQuery(language, word) {
//     var deferred = q.defer();
//     https.get({
//         host: 'od-api.oxforddictionaries.com',
//         path: '/api/v1/entries/'+language+'/'+word,
//         headers: {
//             "Accept": "application/json",
//             "app_id": appId,
//             "app_key": appKey
//         }
//     }, function(response) {
//         var body = '';
//         response.on('data', function(d) {
//             body += d;
//         });
//         response.on('end', function() {
//             try {
//                 body = JSON.parse(body);
//                 deferred.resolve(body);
//             } catch(e) {
//                 deferred.reject({error: e});
//             }
//         });
//     });
//     return deferred.promise;
// }