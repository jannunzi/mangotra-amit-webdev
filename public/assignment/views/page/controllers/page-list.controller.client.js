/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, PageService) {
        var model = this;
        model.uid = $routeParams["uid"];
        model.wid = $routeParams["wid"];

        function init() {
            PageService
                .findPageByWebsiteId(model.wid)
                .then(function (response) {
                    model.pages = response.data;
                });
        }
        init();
    }
})();