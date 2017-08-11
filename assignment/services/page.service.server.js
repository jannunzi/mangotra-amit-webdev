/**
 * Created by cammy on 8/2/17.
 */
var app = require("../../express");
var pageModel = require("../models/page.model.server");

// var pages = [
//     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
//     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
//     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
// ];

app.get("/api/website/:websiteId/page", findPageByWebsiteId);
app.get("/api/page/:pageId", findPageById);
app.post("/api/website/:websiteId/page", createPage);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/website/:websiteId/page/:pageId", deletePage);

function findPageByWebsiteId(req, res) {
    var websiteId = req.params.websiteId;

    pageModel
        .findPageByWebsiteId(websiteId)
        .then(function (pages) {
            res.json(pages);
        });
    // var _pages = [];
    // for(var p in pages) {
    //     if(pages[p].websiteId === websiteId) {
    //         _pages.push(pages[p]);
    //     }
    // }
    // res.send(_pages);
}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    pageModel
        .findPageById(pageId)
        .then(function (pageDoc) {
            res.json(pageDoc);
        }, function (err) {
            res.statusCode(404).send(err);
        });
    // for(var p in pages) {
    //     if(pages[p]._id === pageId) {
    //         res.send(pages[p]);
    //     }
    // }
}

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        });
    //     }, function (err) {
    //         res.statusCode(500).send(err);
    //     });
    // res.json(page);
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.statusCode(404).send(err);
        });
    // for(var p in pages) {
    //     if(pages[p]._id === pageId) {
    //         pages[p] = page;
    //         res.send(pages[p]);
    //         return;
    //     }
    // }
    // res.send("0");
}

function deletePage(req, res) {
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    pageModel
        .deletePage(websiteId, pageId)
        .then(function (status) {
            res.json(status);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
        });
    // for(var p in pages) {
    //     if(pages[p]._id === pageId) {
    //         delete pages[p];
    //     }
    // }
    // res.send("0");
}

