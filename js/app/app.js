

angular.module('app', ['ngRoute', 'app.languages','app.katas','app.home'])
    .config(['$routeProvider', function($routeProvider, $scope) {
    $routeProvider.otherwise({redirectTo: '/home'});
}]);








