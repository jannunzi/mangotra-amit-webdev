var app = require("../express");

var q = require("q");
const https = require("https");

app.get("kjsdfhsjhd", searchEvent);

function searchEvent(req, res) {
    var text = req.body;
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
        host: ''
    });
}


function oxfordSearchQuery(language, word) {
    var deferred = q.defer();
    https.get({
        host: 'od-api.oxforddictionaries.com',
        path: '/api/v1/entries/'+language+'/'+word,
        headers: {
            "Accept": "application/json",
            "app_id": appId,
            "app_key": appKey
        }
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
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