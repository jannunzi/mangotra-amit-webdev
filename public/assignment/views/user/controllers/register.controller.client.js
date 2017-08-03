/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);
    
    function registerController(UserService, $location) {
        var model = this;
        
        model.registerUser = registerUser;
        
        function init() {
            
        }
        init();
        
        function registerUser(user) {
            if(!user.username) {
                model.errorMessage = "Enter username and password to register";
                return;
            }
            UserService
                .findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;
                    if(_user === "0") {
                        if (user.password === user.verify_password) {
                            UserService.createUser(user)
                                .then(function (response) {
                                    _user = response.data;
                                    $location.url("/profile/" + _user._id);
                                })

                        } else {
                            model.errorMessage = "Password doesn't match";
                        }
                    } else {
                        model.errorMessage = "User already exists";
                    }
                })

        }
    }
})();