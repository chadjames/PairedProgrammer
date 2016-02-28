angular.module('app.katas', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/katas', {
            templateUrl: 'katas/katas.html',
            controller: 'katasController'
        });
    }]).controller('katasController', function ($scope, kataService) {
    $scope.katas = kataService.allKatas();

});