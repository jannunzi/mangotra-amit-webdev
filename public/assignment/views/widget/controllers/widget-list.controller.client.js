/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, $sce, WidgetService) {
        var model = this;

        model.uid = $routeParams["uid"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];

        model.trustworthyUrl = trustworthyUrl;
        model.trustHtmlContent = trustHtmlContent;

        function init() {
            WidgetService
                .findWidgetsByPageId(model.pid)
                .then(function (response) {
                    model.widgets = response.data;
                });
        }
        init();

        function trustworthyUrl(resource) {
            var youtubeUrl = "https://youtube.com/embed/";
            var urlParts = resource.split("/");
            youtubeUrl += urlParts[urlParts.length - 1];
            return $sce.trustAsResourceUrl(youtubeUrl);
        }

        function trustHtmlContent(html) {
            return $sce.trustAsHtml(html);
        }
    }
})();