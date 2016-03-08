angular.module('app', ['ngCookies',
                       'ngRoute',
                       'app.history',
                       'app.seeds',
                       'app.common',
                       'app.languages',
                       'app.katas',
                       'app.home',
                       'app.login',
                       'firebase',
                       'jcs-autoValidate',
                       'app.partnerAccept'])
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/home'});
}]);








