angular.module('app')
    .factory('languageService', function ($firebaseArray) {
        var languages = new Firebase("https://paired-progammer.firebaseio.com/languages");
        return {
            allLanguages: function () {
                return $firebaseArray(languages);
            }
        }

    }).factory('programmerService', function ($firebaseArray) {
    var programmers = new Firebase("https://paired-progammer.firebaseio.com/programmer");
    return {
        allProgrammers: function () {
            return $firebaseArray(programmers);
        }
    }
    }).factory('kataService', function ($firebaseArray) {
    var katas = new Firebase("https://paired-progammer.firebaseio.com/katas");
    return {
        allKatas: function () {
            return $firebaseArray(katas);
        }
    }
    }).factory('retrieveUserService', function($firebaseObject){
        var ref = new Firebase("https://paired-progammer.firebaseio.com/programmer");
    return {
        findUser: function(uid, callback){
            ref.orderByChild("firstName").equalTo('chad').once('value', function(snapshot){
                callback(snapshot.val()[Object.keys(snapshot.val())[0]]);
            });

        }
    }

});