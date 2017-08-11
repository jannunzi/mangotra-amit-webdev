/**
 * Created by cammy on 8/1/17.
 */
var app = require("../../express");
var websiteModel = require("../models/website.model.server");


app.get("/api/user/:userId/website", findWebsitesByUser);
app.get("/api/user/:userId/website/:websiteId", findWebsitesById);
app.post("/api/user/:userId/website", createWebsite);
app.put("/api/user/:userId/website/:websiteId", updateWebsite);
app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);


function findWebsitesByUser(req, res) {
    var userId = req.params.userId;

    websiteModel
        .findWebsitesByUser(userId)
        .then(function (websites) {
            res.json(websites);
        });
}

function findWebsitesById(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .findWebsitesById(websiteId)
        .then(function (websiteDoc) {
            res.json(websiteDoc);
        }, function (err) {
            res.sendStatus(404);
        });
}

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    websiteModel
        .createWebsite(userId, website)
        .then(function (websiteDoc) {
           res.json(websiteDoc);
        }, function (err) {
            res.statusCode(500).send(err);
        });
    res.json(website);
}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;
    websiteModel
        .updateWebsite(website, websiteId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.statusCode(404).send(err);
        });
}

function deleteWebsite(req, res) {
    var developerId =  req.params.userId;
    var websiteId = req.params.websiteId;
    websiteModel
        .deleteWebsite(developerId, websiteId)
        .then(function (status) {
            res.json(status);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

