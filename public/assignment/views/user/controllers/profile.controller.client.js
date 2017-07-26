/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService, $location) {
        var model = this;
        model.uid = $routeParams["uid"];

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            model.user = UserService.findUserById(model.uid);
        }
        init();

        function updateUser(user) {
            model.user = UserService.updateUser(user._id, user);
        }

        function unregister(user) {
            UserService.deleteUser(user._id);
            $location.url("login/");
        }
    }
})();