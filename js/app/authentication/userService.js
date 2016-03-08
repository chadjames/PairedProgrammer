angular.module('app')
    .factory('authenticationService', function () {

    }).service('userCreationService', function ($cookies, $timeout, $rootScope, programmerService) {
    var ref = new Firebase("https://paired-progammer.firebaseio.com");
    this.currentUser;
        this.createUser = function (email, password, firstName, lastName, userName, concurrentSessions, languages) {
            ref.createUser({
                email: email,
                password: password
            }, function (error, userData) {
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
                    console.log("Successfully created user account with uid:", userData.uid);
                    programmerService.allProgrammers().$add({
                        uid: userData.uid,
                        firstName: firstName,
                        lastName: lastName,
                        userName: userName,
                        concurrentSessions: concurrentSessions,
                        languages: languages
                    });
                }
            });
        };
        this.loginUser =  function (username, password, callback) {
            ref.authWithPassword({
                email: username,
                password: password
            }, function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    callback(authData);
                }

            });
        };
});