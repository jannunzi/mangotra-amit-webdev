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
            model.websites = WebsiteService.findWebsitesByUser(model.uid);
        }
        init();
        
        function createWebsite(website) {
            if (!website || !website.name) {
                model.errorMessage = "Enter the website name";
                return;
            }
            var _websiteName = WebsiteService.findWebsitesByName(website.name, model.uid);
            if (!_websiteName) {
                WebsiteService.createWebsite(model.uid, website);
                $location.url("/user/" + model.uid + "/website");
            } else {
                model.errorMessage = "Website already exists";
            }
        }
    }
})();