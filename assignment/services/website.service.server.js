/**
 * Created by cammy on 8/1/17.
 */
var app = require("../../express");

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];


app.get("/api/user/:userId/website", findWebsitesByUser);
app.get("/api/user/:userId/website/:websiteId", findWebsitesById);
app.post("/api/user/:userId/website", createWebsite);
app.put("/api/website/:websiteId", updateWebsite);
app.delete("/api/website/:websiteId", deleteWebsite);


function findWebsitesByUser(req, res) {
    var userId = req.params.userId;
    var sites = [];
    for(var w in websites) {
        if(websites[w].developerId === userId) {
            sites.push(websites[w]);
        }
    }
    res.json(sites);
}


function findWebsitesById(req, res) {
    var websiteId = req.params.websiteId;
    for(var w in websites) {
        if(websites[w]._id === websiteId) {
            res.send(websites[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    website._id = (new Date()).getTime() + "";
    website.developerId = userId;
    websites.push(website);
    res.json(website);
}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;
    for(var w in websites) {
        if(websites[w]._id === websiteId) {
            websites[w] = website;
            res.send(websites[w]);
            return;
        }
    }
    res.send("0");
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    for(var w in websites) {
        if(websites[w]._id === websiteId) {
            delete websites[w];
        }
    }
    res.send("0");
}
