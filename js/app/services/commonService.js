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

});