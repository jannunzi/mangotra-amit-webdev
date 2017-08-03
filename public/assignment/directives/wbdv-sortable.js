/**
 * Created by cammy on 8/3/17.
 */
(function () {
    angular
        .module("webDevDirectives", [])
        .directive("WebDevDirectives", WebDevDirectives);

    function WebDevDirectives(WidgetService) {

        return {
            link: linkFunction
        };

        function linkFunction(scope, element) {
            var startIndex = -1;
            var endIndex = -1;
            $(element)
                .sortable({
                    axis: "y",
                    handle: ".grab-this-thing",
                    start: function (event, ui) {
                        startIndex = ui.item.index();
                    },
                    stop: function (event, ui) {
                        endIndex = ui.item.index();
                        WidgetService
                            .updateWidgetIndex(startIndex, endIndex, scope.model.pid);
                    }
                });
        }
    }
})();