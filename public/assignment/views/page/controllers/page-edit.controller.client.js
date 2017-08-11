/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("editPageController", editPageController);

    function editPageController($routeParams, PageService, $location) {
        var model = this;

        model.uid = $routeParams["uid"];
        model.wid = $routeParams.wid;
        model.pid = $routeParams["pid"];

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            PageService
                .findPageByWebsiteId(model.wid)
                .then(function (response) {
                    model.pages = response.data;
                });
            PageService
                .findPageById(model.pid, model.wid)
                .then(function (response) {
                    model.page = response.data;
                });
        }
        init();

        function updatePage(page) {
            if(page.name) {
                PageService
                    .updatePage(page, model.wid)
                    .then(function (response) {
                        $location
                            .url("/user/" + model.uid + "/website/" + model.wid + "/page");
                    });
            } else {
                model.errorMessage = "Enter the name of page";
            }
        }

        function deletePage(page) {
            PageService
                .deletePage(model.wid, page._id)
                .then(function (response) {
                    $location
                        .url("/user/" + model.uid + "/website/" + model.wid + "/page");
                });
        }
    }
})();