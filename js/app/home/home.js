angular.module('app.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'homeController'
        });
    }]).controller('homeController', function (programmerService, kataService, languageService, $scope, $interval, $timeout, $rootScope) {

    $scope.programmers = programmerService.allProgrammers();
    $scope.languages = languageService.allLanguages();
    $scope.katas = kataService.allKatas();

    var data_arrays = [$scope.programmers, $scope.languages, $scope.katas];
    var current_shuffle_index = 0;
    var completeSpin = false;
    var selectedPerson;
    var selectedLanguage;
    var selectedKata;



    function stopTimerAndSelect() {
        if (angular.isDefined($scope.timer)) {
            $interval.cancel($scope.timer);
            selectItemForGroup();
        }
    };
    $scope.getLoggedInUser = function () {
        console.log('test');
        return $rootScope.authenticatedUser;
    }

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
    function resetBoard() {
        current_shuffle_index = 0;
        completeSpin = false;
        $('.selected').each(function () {
            $(this).css('background-color', 'white');
        })


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
            completeSpin = true;
            setSelectedItems();
            $(function () {
                $("#dialog").dialog(
                    {
                        title: 'Your Mission', width: 600,
                        buttons: {
                            "DECLINE": function () {
                                resetBoard();
                                $(this).dialog("close");
                            },
                            "ACCEPT": function () {
                                resetBoard();
                                $(this).dialog("close");
                            }
                        }
                    }
                ).html('Your mission, should you choose to accept, is to complete the <b>' +
                    selectedKata + '</b> kata in the <b>' +
                    selectedLanguage + '</b> language  with <b>' +
                    selectedPerson + '</b>');
            });
        }
    }
});