/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetChooserController", widgetChooserController);

    function widgetChooserController($routeParams, WidgetService, $location) {
        var model = this;

        model.uid = $routeParams.uid;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;

        model.createWidget = createWidget;

        function init() {
            WidgetService
                .findWidgetsByPageId(model.pid)
                .then(function (response) {
                    model.widgets = response.data;
                });
        }
        init();

        function createWidget(type) {
            var widget = {widgetType: type};
            WidgetService
                .createWidget(model.pid, widget)
                .then(function (response) {
                    var widget = response.data;
                    $location
                        .url("/user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget/" + widget._id);
                });
        }
    }
})();