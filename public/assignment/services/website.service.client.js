/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    
    function WebsiteService($http) {
        var api = {
            "createWebsite" : createWebsite,
            "findWebsitesByUser" : findWebsitesByUser,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            var url = "/api/user/" + userId + "/website";
            return $http.post(url, website);
        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWebsiteById(websiteId, userId) {
            var url = "/api/user/" + userId + "/website/" + websiteId;
            return $http.get(url);
        }

        function updateWebsite(website, userId) {
            var url = "/api/user/" + userId + "/website/" + website._id;
            return $http.put(url, website);
        }

        function deleteWebsite(website, userId) {
            var url = "/api/user/" + userId + "/website/" + website._id;
            return $http.delete(url);
        }
    }
})();