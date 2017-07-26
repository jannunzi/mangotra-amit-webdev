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
            model.pages = PageService.findPageByWebsiteId(model.wid);
        }
        init();

        function addPage(page) {
            if(!page || !page.name) {
                model.errorMessage = "Enter page name";
                return;
            }
            var pageName = PageService.findPageByName(page.name, model.wid);
            if(!pageName) {
                PageService.createPage(model.wid, page);
                $location.url("/user/" + model.uid + "/website/" + model.wid + "/page");
            } else {
                model.errorMessage = "Page already exists";
            }
        }
    }
})();