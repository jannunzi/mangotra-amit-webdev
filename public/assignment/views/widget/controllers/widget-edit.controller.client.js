/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("editWidgetController", editWidgetController);

    function editWidgetController($routeParams, WidgetService, $location) {
        var model = this;

        //Event handlers:
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        model.uid =  $routeParams["uid"];
        model.wid =  $routeParams["wid"];
        model.pid = $routeParams["pid"];
        model.wgid = $routeParams["wgid"];

        function init() {
            WidgetService
                .findWidgetsByPageId(model.pid)
                .then(function (response) {
                    model.widgets = response.data;
                });
            WidgetService
                .findWidgetById(model.wgid)
                .then(function (response) {
                    model.widget = response.data;
                });
        }
        init();

        function updateWidget(widget) {
            WidgetService
                .updateWidget(widget._id, widget)
                .then(function (response) {
                    $location.url("/user/"+model.uid+"/website/"+model.wid+"/page/"+model.pid+"/widget");
                });
        }

        function deleteWidget(widget) {
            WidgetService
                .deleteWidget(widget)
                .then(function (response) {
                    $location.url("/user/"+model.uid+"/website/"+model.wid+"/page/"+model.pid+"/widget");
                });
        }
    }
})();