(function () {
    angular
        .module("WebAppMaker")
        .service("FlickrService", FlickrService);
    function FlickrService($http) {

        this.searchPhotos = searchPhotos;

        var key = "e8ec0bdc858f1a1c70aa3efd0f181707";
        var secret = "28da32f290f8fbef";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(term) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", term);
            return $http.get(url)
                .then(function (response) {
                    return response;
                });
        }
    }
})();