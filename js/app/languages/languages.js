angular.module('app.languages', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/languages', {
            templateUrl: 'languages/languages.html',
            controller: 'languagesController'
        });
    }]).controller('languagesController', function ($scope, languageService) {

    $scope.languages = languageService.allLanguages();

});