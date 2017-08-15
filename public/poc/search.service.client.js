/**
 * Created by cammy on 8/4/17.
 */
(function () {
    angular
        .module("HappeningsApp")
        .service("searchService", searchService);
    
    function searchService($http) {
        var model = this;

        model.searchEvent = searchEvent;

function searchEvent(text) {
    var url = "/find/events?text="+text;
    return $http.get(url);
}
    }
})();