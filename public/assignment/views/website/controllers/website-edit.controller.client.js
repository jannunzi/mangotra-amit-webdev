/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("editWebsiteController", editWebsiteController);
    
    function editWebsiteController($routeParams, WebsiteService, $location) {
        var model = this;

        model.uid = $routeParams["uid"];
        model.wid = $routeParams["wid"];

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(model.uid)
                .then(function (websites) {
                    model.websites = websites;
                });
            WebsiteService
                .findWebsiteById(model.wid, model.uid)
                .then(function (response) {
                    model.website = response.data;
                });
        }
        init();

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(website, model.uid)
                .then(function (response) {
                    $location.url("/user/" + model.uid + "/website");
                });
        }

        function deleteWebsite(website) {
            WebsiteService
                .deleteWebsite(website, model.uid)
                .then(function (response) {
                    $location.url("/user/" + model.uid + "/website");
                });
        }
    }
})();