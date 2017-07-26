/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, WebsiteService) {
        var model = this;

        model.uid = $routeParams["uid"];

        function init() {
            model.websites = WebsiteService.findWebsitesByUser(model.uid);
        }
        init();

    }
})();