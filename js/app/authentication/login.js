
angular.module('app.login', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'authentication/login.html',
            controller: 'userController'
        });
    }]).controller('userController', function($scope, programmerService) {
    $scope.register = function() {


        alert($scope.username);
        var ref = new Firebase("https://paired-progammer.firebaseio.com");
        ref.createUser({
            email: $scope.username,
            password: $scope.password

        }, function(error, userData) {
            if (error) {
                switch (error.code) {
                    case "EMAIL_TAKEN":
                        console.log("The new user account cannot be created because the email is already in use.");
                        break;
                    case "INVALID_EMAIL":
                        console.log("The specified email is not a valid email.");
                        break;
                    default:
                        console.log("Error creating user:", error);
                }
            } else {
                //create matching user
                programmerService.allProgrammers().$add({name: $scope.username, uid:userData.uid });
                console.log("Successfully created user account with uid:", userData.uid);
            }
        });
    }
    $scope.login = function(){
        var ref = new Firebase("https://paired-progammer.firebaseio.com");
        ref.authWithPassword({
            email: $scope.username,
            password: $scope.password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
            }


    })}

});