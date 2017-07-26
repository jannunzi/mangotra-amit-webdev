/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    
    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];
        var api = {
            "createWebsite" : createWebsite,
            "findWebsitesByName" : findWebsitesByName,
            "findWebsitesByUser" : findWebsitesByUser,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            website._id = (new Date()).getTime() + "";
            website.developerId = userId;
            websites.push(website);
        }

        function findWebsitesByUser(userId) {
            var sites = [];
            for(var w in websites) {
                if(websites[w].developerId === userId) {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }

        function findWebsitesByName(websiteName, userId) {
            for(var w in websites) {
                if(websites[w].name === websiteName && websites[w].developerId === userId) {
                    return websites[w].name;
                }
            }
            return false;
        }

        function findWebsiteById(websiteId, userId) {
            for(var w in websites) {
                if(websites[w].developerId === userId && websites[w]._id === websiteId) {
                    return angular.copy(websites[w]);
                }
            }
        }

        function updateWebsite(website, userId) {
            for(var w in websites) {
                if(websites[w].developerId === userId && websites[w]._id === website._id) {
                    websites[w] = website;
                }
            }
        }

        function deleteWebsite(website, userId) {
            for(var w in websites) {
                if(websites[w].developerId === userId && websites[w]._id === website._id) {
                    delete websites[w];
                }
            }
        }
    }
})();