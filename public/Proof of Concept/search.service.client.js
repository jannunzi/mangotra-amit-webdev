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
            // var key = "162d592f5c53704651484b4c2c104f23";
            // var token = "IJX2AX72RMSXZK4VKD77";
            // var clientKey = "4K6ZH2TUDJED4E6IWZ";
            // var url = "https://www.eventbrite.com/oauth/authorize?response_type="+token+"&client_id=";
            // url += clientKey + "/";
            var url = "https://api.meetup.com/find/events?&sign=true&format=json&text="+text;
            // var url = "https://api.meetup.com/find/events?sign=true&sig_id=219882901&key="+key+"&text=" + text;
            //https://api.meetup.com/find/events?&sign=true&photo-host=public&text=beer
            //https://api.meetup.com/find/events?photo-host=public&text=beer&sig_id=219882901&sig=aa19c7d65fe5a765dc78fc85e9751c6611d32e1c
            // console.log(gotIt);
            return $http.get(url);
            // alert(text);

        }
    }
})();