'use strict';

var app = angular.module('QC');

app.controller('MainCtrl', [
  '$scope',
  'localStorageService',
  function ($scope, localStorageService) {

    function Contest() {
      this.participants = [];
      this.categories = [];
    }

    function Participant(name) {
      this.id = randomId();
      this.name = name;
      this.categories = [];
    }

    function Category(name, category) {
      this.id = randomId();
      this.name = name;
      this.type = category.type;
      this.maxValue = category.maxValue;
      this.value = 1;
    }

    function randomId() {
      return Math.floor(Math.random() * 10000000000);
    }

    // Start fresh
    var contest = $scope.contest = localStorageService.get('contest') || new Contest();

    $scope.categories = contest.categories;
    $scope.participants = contest.participants;
    $scope.categoryOptions = [
      {type: '1/5', 'maxValue': 5},
      {type: '1/10', 'maxValue': 10},
      {type: '1/100', 'maxValue': 100}
    ];
    $scope.cType = $scope.categoryOptions[0];

    $scope.save = function () {
      localStorageService.set('contest', contest);
    };

    $scope.addParticipant = function () {
      if ($scope.pName) {
        var newParticipant = new Participant($scope.pName);
        contest.participants.push(newParticipant);

        for (var i = 0; i < contest.categories.length; i++) {
          newParticipant.categories.push(angular.copy(contest.categories[i]));
        }

        $scope.pName = '';
        $scope.save();

      }
    };


    $scope.addCategory = function () {
      if ($scope.cName) {
        var newCategory = new Category($scope.cName, $scope.cType);
        contest.categories.push(newCategory);

        for (var i = 0; i < contest.participants.length; i++) {
          contest.participants[i].categories.push(angular.copy(newCategory));
        }

        $scope.cName = '';
        $scope.save();
      }
    };


    $scope.pKeyPressed = function () {
      $scope.addParticipant();
    };

    $scope.cKeyPressed = function () {
      $scope.addCategory();
    };

    $scope.clearAll = function () {
      localStorageService.clearAll();
      $scope.contest.participants.length = 0;
      $scope.contest.categories.length = 0;
    };

    $scope.finish = function () {
      var max = 0,
        winner;

      for (var i = 0; i < contest.participants.length; i++) {
        var pValue = 0;
        for (var j = 0; j < contest.participants[i].categories.length; j++) {
          pValue += contest.participants[i].categories[j].value;
        }
        if (pValue > max) {
          max = pValue;
          winner = contest.participants[i];
        }
        pValue = 0;
      }

      $scope.showWinner = true;
      $scope.winnerMsg = 'Congratulations ' + winner.name + ', you won with ' + max + ' points!!!!';

    };

    $scope.$watch('participants + categories', function () {
      $scope.disableFinish = $scope.participants.length === 0;
      $scope.disableClearAll = $scope.participants.length === 0 && $scope.categories.length === 0;
    });

    $scope.showWinner = false;

  }
]);
