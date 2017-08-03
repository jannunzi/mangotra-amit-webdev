/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            "createWidget" : createWidget,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "findWidgetById" : findWidgetById,
            "updateWidget" : updateWidget,
            "deleteWidget" : deleteWidget,
            "updateWidgetIndex" : updateWidgetIndex
        };
        return api;

        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget);
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
        }

        function deleteWidget(widget) {
            var url = "/api/widget/" + widget._id;
            return $http.delete(url);
        }
        
        function updateWidgetIndex(start, end, pageId) {
            var url = "/api/page/" + pageId + "/widget?initial=" + start + "&final=" + end;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                })
        }

    }
})();