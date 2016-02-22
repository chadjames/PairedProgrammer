angular.module('app.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'homeController'
        });
    }]).controller('homeController', ['$scope', '$interval', '$timeout', function ($scope, $interval, $timeout) {
    $scope.programmers = [
        {name: 'Jani Evens', country: 'Norway'},
        {name: 'Hege Brown', country: 'Sweden'},
        {name: 'Kai Choi', country: 'Denmark'},
        {name: 'Chad James', country: 'Norway'},
        {name: 'Mike Stevens', country: 'Sweden'},
        {name: 'Sara Evans', country: 'Denmark'},
        {name: 'Todd Rowe', country: 'Norway'},
        {name: 'Scott Little', country: 'Sweden'},
        {name: 'Lele Pons', country: 'Denmark'},
        {name: 'Jorge Hera', country: 'Norway'},
        {name: 'Hellen Keller', country: 'Sweden'},
        {name: 'Tommy Boy', country: 'Denmark'}
    ];
    $scope.languages = [
        {name: 'Java'},
        {name: 'Groovy'},
        {name: 'Javascript'},
        {name: 'Scala'},
        {name: 'Ruby'},
        {name: 'Python'}
    ];
    $scope.katas = [
        {name: 'FizzBuzz'},
        {name: 'RomanNumeralConverter'},
        {name: 'VendingMachine'},
        {name: 'BerlinClock'},
        {name: 'Anagrams'}
    ];
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
        console.log('select item grp');
        var currentGroup = $('.list-group')[current_shuffle_index];
        var random = Math.floor((Math.random() * data_arrays[current_shuffle_index].length) + 1);
        var child = $(currentGroup).children('.list-group-item')[random];
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
                                $(this).dialog("close");
                            },
                            "ACCEPT": function () {
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
}]);