angular.module('app')
    .factory('authenticationService', function(){

    }).factory('userCreationService', function(){
    var ref = new Firebase("https://paired-progammer.firebaseio.com");


    ref.createUser({
        email: "bobtonyxxx@firebase.com",
        password: "correcthorsebatterystaple"
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
            console.log("Successfully created user account with uid:", userData.uid);
        }
    });

})