angular.module('app.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'homeController'
        });
    }]).controller('homeController', function ($window,
                                               acceptService,
                                               programmerService,
                                               kataService,
                                               languageService,
                                               $scope,
                                               $interval,
                                               $timeout,
                                               $rootScope) {

    $scope.programmers = programmerService.allProgrammers();
    $scope.languages = languageService.allLanguages();
    $scope.katas = kataService.allKatas();

    var data_arrays = [$scope.programmers, $scope.languages, $scope.katas];
    var current_shuffle_index = 0;
    var selectedPerson;
    var selectedLanguage;
    var selectedKata;

    $scope.decline = function(){
        resetBoard();
        $scope.closeModal();
    };
    $scope.accept = function(){
        $scope.closeModal();
        acceptService.setData(selectedPerson,selectedLanguage, selectedKata);
        $window.location.href = '#partnerAccept';
    };
    $scope.getLoggedInUser = function () {
        return $rootScope.authenticatedUser;
    };

    $scope.shuffle = function (array) {

        var random = Math.round(Math.random() * (4500 - 500)) + 500;

        if (!array) {
            array = data_arrays[current_shuffle_index];
        }
        var first = array[0];
        var i = 0;
        $scope.timer = $interval(function () {
            if (i == array.length - 1) {
                i = 0;
            }
            sortArray(i++);
        }, 10);

        $timeout(stopTimerAndSelect, random);

        function sortArray(i) {
            if (i == array.length) {
                array[array.length - 1] = first;
            } else {
                var temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
            }
        }

    };

    $scope.closeModal = function(){
        $('#myModal').removeClass('in');
        $('#myModal').css('display','none');
    };


    function stopTimerAndSelect() {
        if (angular.isDefined($scope.timer)) {
            $interval.cancel($scope.timer);
            selectItemForGroup();
        }
    };

    function showModal(){
        $('#myModal').addClass('in');
        $('#myModal').css('display','block');
        $('div.modal-body').html('Your mission, should you choose to accept, is to complete the <b>' + selectedKata + '</b> kata in <b>' + selectedLanguage + '</b> with <b>' + selectedPerson +'</b>');
    }

    function resetBoard() {
        current_shuffle_index = 0;
        $('.selected').each(function () {
            $(this).removeClass('selected');
            $(this).css('background-color', 'white');
        });

    }
    function setSelectedItems() {
        var results = [];
        $('.selected').each(function () {
            results.push($(this).text());
        });
        selectedPerson = results[0];
        selectedLanguage = results[1];
        selectedKata = results[2];
    }

    function selectItemForGroup() {
        var currentGroup = $('.shuffle-group')[current_shuffle_index];
        var child = $(currentGroup).children('.shuffle-group-panel').children('.shuffle-group-item')[2];

        $(child).css("background-color", '#337ab7');
        $(child).addClass('selected');
        if (current_shuffle_index < data_arrays.length - 1) {
            $scope.shuffle(data_arrays[++current_shuffle_index])
        } else {
            current_shuffle_index = 0;
            setSelectedItems();
            showModal();
        }
    }
});