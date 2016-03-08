angular.module('app.seeds', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/seeds', {
            templateUrl: 'seeds/seeds.html',
            controller: 'seedsController'
        });
    }]).controller('seedsController', function ($scope) {
        //get seeds from firebase
});