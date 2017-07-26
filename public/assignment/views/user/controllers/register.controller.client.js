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
            var _user = UserService.findUserByUsername(user.username);
            if(!_user) {
                if (user.password === user.verify_password) {
                    var user = UserService.createUser(user);
                    $location.url("/profile/" + user._id);
                } else {
                    model.errorMessage = "Password doesn't match";
                }
            } else {
                model.errorMessage = "User already exists";
            }
        }
    }
})();