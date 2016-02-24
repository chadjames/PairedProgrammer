

angular.module('app', ['ngRoute', 'app.languages','app.katas','app.home','app.login', 'firebase'])
    .config(['$routeProvider', function($routeProvider, $scope) {
    $routeProvider.otherwise({redirectTo: '/home'});
}]);








