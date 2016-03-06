

angular.module('app', ['ngCookies','ngRoute', 'app.common', 'app.languages','app.katas','app.home','app.login', 'firebase', 'jcs-autoValidate'])
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/home'});
}]);








