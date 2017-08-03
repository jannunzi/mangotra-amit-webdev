/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("newWebsiteController", newWebsiteController);

    function newWebsiteController($routeParams, WebsiteService, $location) {
        var model = this;

        model.uid = $routeParams["uid"];
        model.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(model.uid)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();
        
        function createWebsite(website) {
            if (!website || !website.name) {
                model.errorMessage = "Enter the website name";
                return;
            }
            WebsiteService
                .createWebsite(model.uid, website)
                .then(function (response) {
                    $location.url("/user/" + model.uid + "/website");
                });
        }
    }
})();