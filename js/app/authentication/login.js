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
                                               userCreationService) {

    $scope.register = function () {
        userCreationService.createUser(
            $scope.email,
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
                if (result) {
                    //get the user object for the id and store
                    var prog = programmerService.allProgrammers();
                    prog.$loaded()
                        .then(function () {

                            angular.forEach(prog, function (p) {
                                console.log(p);
                            })
                        });

                    $cookies.put('currentUser', $scope.username);
                    userCreationService.currentUser = $scope.username;
                    $window.location.href = '#home';

                }
            }
        );


    };


});