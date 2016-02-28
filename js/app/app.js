

angular.module('app', ['ngRoute', 'app.languages','app.katas','app.home','app.login', 'firebase'])
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/home'});
}]);








