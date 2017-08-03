/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("newPageController", newPageController);

    function newPageController($routeParams, PageService, $location) {
        var model = this;

        model.uid = $routeParams["uid"];
        model.wid = $routeParams["wid"];

        model.addPage = addPage;

        function init() {
            PageService
                .findPageByWebsiteId(model.wid)
                .then(function (response) {
                    model.pages = response.data;
                })
        }
        init();

        function addPage(page) {
            if(!page || !page.name) {
                model.errorMessage = "Enter page name";
                return;
            }
            PageService
                .createPage(model.wid, page)
                .then(function (response) {
                    $location
                        .url("/user/" + model.uid + "/website/" + model.wid + "/page");
                });
        }
    }
})();