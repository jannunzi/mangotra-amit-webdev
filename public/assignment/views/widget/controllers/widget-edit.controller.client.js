/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("editWidgetController", editWidgetController);

    function editWidgetController($routeParams, WidgetService, $location) {
        var model = this;

        //Event handles:
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        model.uid =  $routeParams["uid"];
        model.wid =  $routeParams["wid"];
        model.pid = $routeParams["pid"];
        model.wgid = $routeParams["wgid"];

        function init() {
            model.widgets = WidgetService.findWidgetsByPageId(model.pid);
            model.widget = WidgetService.findWidgetById(model.wgid, model.pid);
        }
        init();

        function updateWidget(widget) {
            var _widget = WidgetService.updateWidget(widget._id, widget);
            $location.url("/user/"+model.uid+"/website/"+model.wid+"/page/"+model.pid+"/widget");
        }

        function deleteWidget(widget) {
            WidgetService.deleteWidget(widget, model.pid);
            $location.url("/user/"+model.uid+"/website/"+model.wid+"/page/"+model.pid+"/widget");
        }
    }
})();