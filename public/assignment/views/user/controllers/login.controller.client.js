/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($location, UserService) {
        var model = this;

        model.login = login;

        function init() {

        }
        init();

        function login(user)  {
            if(!user) {
                model.errorMessage = "Enter username and password";
                return;
            }
            UserService.findUserByCredentials(user.username, user.password)
                .then(function (response) {
                    user = response.data;
                    if(user === "0") {
                        model.errorMessage = "Invalid username and password";
                    } else {
                        $location.url("profile/"+user._id);
                    }
                });

        }
    }
})();