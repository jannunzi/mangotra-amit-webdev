/**
 * Created by cammy on 8/2/17.
 */
var app = require("../express");

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

app.get("/api/website/:websiteId/page", findPageByWebsiteId);
app.get("/api/page/:pageId", findPageById);
app.post("/api/website/:websiteId/page", createPage);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

function findPageByWebsiteId(req, res) {
    var websiteId = req.params.websiteId;
    var _pages = [];
    for(var p in pages) {
        if(pages[p].websiteId === websiteId) {
            _pages.push(pages[p]);
        }
    }
    res.send(_pages);
}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    for(var p in pages) {
        if(pages[p]._id === pageId) {
            res.send(pages[p]);
        }
    }
}

function createPage(req, res) {
    var page = req.body;
    page.websiteId = req.params.websiteId;
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.json(page);
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    for(var p in pages) {
        if(pages[p]._id === pageId) {
            pages[p] = page;
            res.send(pages[p]);
            return;
        }
    }
    res.send("0");
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    for(var p in pages) {
        if(pages[p]._id === pageId) {
            delete pages[p];
        }
    }
    res.send("0");
}

