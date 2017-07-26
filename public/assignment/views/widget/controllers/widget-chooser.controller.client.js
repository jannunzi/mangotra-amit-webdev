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
            model.widgets = WidgetService.findWidgetsByPageId(model.pid);
        }
        init();

        function createWidget(type) {
            var widget = {widgetType: type};
            var _widget = WidgetService.createWidget(model.pid, widget);
            $location
                .url("/user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget/" + _widget._id);
        }
    }
})();