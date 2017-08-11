var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var websiteModel =  mongoose.model("WebsiteModel", websiteSchema);
var userModel = require("../models/user.model.server");


websiteModel.createWebsite =createWebsite;
websiteModel.findWebsitesByUser =findWebsitesByUser;
websiteModel.findWebsitesById = findWebsitesById;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.updateWebsite = updateWebsite;
websiteModel.addPage = addPage;
websiteModel.removePage = removePage;

module.exports = websiteModel;

function createWebsite(developerId, website) {
    website.developer = developerId;
    var websiteTmp = null;
    return websiteModel
        .create(website)
        .then(function (websiteDoc) {
            websiteTmp = websiteDoc;
            return userModel.addWebsite(developerId, websiteDoc._id);
        })
        .then(function (userDoc) {
            return websiteTmp;
        });
}

function updateWebsite(website, websiteId) {
    return websiteModel.update({_id: websiteId}, { $set: website});
}

function findWebsitesByUser(developerId) {
    return websiteModel.find({developer: developerId});
}

function findWebsitesById(websiteId) {
    return websiteModel.findById(websiteId);
}

function deleteWebsite(developerId, websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
            return userModel.removeWebsite(developerId, websiteId);
        });
}

function addPage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        });
}

function removePage(websiteId, pageId) {
    return  websiteModel
        .findById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        })
}