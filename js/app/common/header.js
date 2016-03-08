angular.module('app.common', [])
    .directive('ngNav', function () {
        return {
            templateUrl: 'common/navBar.html',
            controller: 'navBarController'
        }
    }).controller('navBarController', function ($cookies, $scope, userCreationService,$rootScope) {
    if($cookies.get('currentUser') != null){
        userCreationService.currentUser = $cookies.get('currentUser') ;
    }
    console.log('cookie ' + $cookies.get('currentUser') + ' currentUser ' + $scope.currentUser);
    $scope.$watch(function(){return userCreationService.currentUser}, function(newValue, oldValue){
        $scope.currentUser = userCreationService.currentUser;
        console.log('watch ' + $scope.currentUser);
    });

});
