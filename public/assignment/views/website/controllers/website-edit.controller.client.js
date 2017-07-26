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
            model.websites = WebsiteService.findWebsitesByUser(model.uid);
            model.website = WebsiteService.findWebsiteById(model.wid, model.uid);
        }
        init();

        function updateWebsite(website) {
            if(website.name) {
                WebsiteService.updateWebsite(website, model.uid);
                $location.url("/user/" + model.uid + "/website");
            } else {
                model.errorMessage = "Enter the name of website";
            }
        }

        function deleteWebsite(website) {
            WebsiteService.deleteWebsite(website, model.uid);
            $location.url("/user/" + model.uid + "/website");
        }
    }
})();