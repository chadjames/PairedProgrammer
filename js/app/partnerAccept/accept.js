angular.module('app.partnerAccept', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/partnerAccept', {
            templateUrl: 'partnerAccept/accept.html',
            controller: 'acceptController'
        });
    }]).controller('acceptController', function ($scope, acceptService) {
    var data = acceptService.getData();
    $scope.user = data.user;
    $scope.language = data.language;
    $scope.kata = data.kata;

}).service('acceptService', function(){
        var user ;
        var language ;
        var kata ;
        return{
                getData: function(){
                    return {'user':user, 'language':language, 'kata':kata}
                },
                setData: function(a,b,c){
                        user = a ;
                        language = b ;
                        kata = c;

                }
        }



});