angular.module('app.login', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'authentication/login.html',
            controller: 'userController'
        });
    }]).controller('userController', function ($filter,
                                               $cookies,
                                               $window,
                                               $scope,
                                               programmerService,
                                               $rootScope,
                                               retrieveUserService,
                                               userCreationService) {

    $scope.register = function () {
        userCreationService.createUser($scope.email,
                                       $scope.r_password,
                                       $scope.r_firstname,
                                       $scope.r_lastname,
                                       $scope.r_username,
                                       3,
                                       'java');
    };
    $scope.login = function () {

        userCreationService.loginUser(
            $scope.username,
            $scope.password,
            function (result) {
                retrieveUserService.findUser(result.uid, function (user) {
                    $cookies.put('currentUser', user.userName);
                    userCreationService.currentUser = user.userName;
                    $window.location.href = '#home';
                });
            }
        );
    };
});