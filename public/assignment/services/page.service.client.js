/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            "createPage" : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById" : findPageById,
            "updatePage" : updatePage,
            "deletePage" : deletePage
        };
        return api;

        function createPage(websiteId, page) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, page);
        }
        
        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }

        function findPageByName(pageName, websiteId) {
            var url = "/api/website/" + websiteId + "/page?pagename=" + pageName;
            return $http.get(url);
        }

        function findPageById(pid) {
            var url = "/api/page/" + pid;
            return $http.get(url);
        }

        function updatePage(page) {
            var url = "/api/page/" + page._id;
            return $http.put(url, page);
        }

        function deletePage(page) {
            var url = "/api/page/" + page._id;
            return $http.delete(url);
        }
    }
})();