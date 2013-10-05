'use strict';

var app = angular.module('QC');

app.controller('MainCtrl', [
  '$scope',
  'localStorageService',
  function ($scope, localStorageService) {

    function Contest() {
      this.participants = [];
      this.criteria = [];
    }

    function Participant(name) {
      this.id = randomId();
      this.name = name;
      this.criteria = [];
    }

    function Criterion(name, category) {
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

    $scope.criteria = contest.criteria;
    $scope.participants = contest.participants;
    $scope.criteriaOptions = [
      {type: '1/5', 'maxValue': 5},
      {type: '1/10', 'maxValue': 10},
      {type: '1/100', 'maxValue': 100}
    ];
    $scope.cType = $scope.criteriaOptions[0];

    $scope.save = function () {
      localStorageService.set('contest', contest);
    };

    $scope.addParticipant = function () {
      if ($scope.pName) {
        var newParticipant = new Participant($scope.pName);
        contest.participants.push(newParticipant);

        for (var i = 0; i < contest.criteria.length; i++) {
          newParticipant.criteria.push(angular.copy(contest.criteria[i]));
        }

        $scope.pName = '';
        $scope.save();

      }
    };


    $scope.addCriterion = function () {
      if ($scope.cName) {
        var newCategory = new Criterion($scope.cName, $scope.cType);
        contest.criteria.push(newCategory);

        for (var i = 0; i < contest.participants.length; i++) {
          contest.participants[i].criteria.push(angular.copy(newCategory));
        }

        $scope.cName = '';
        $scope.save();
      }
    };


    $scope.pKeyPressed = function () {
      $scope.addParticipant();
    };

    $scope.cKeyPressed = function () {
      $scope.addCriterion();
    };

    $scope.clearAll = function () {
      localStorageService.clearAll();
      $scope.contest.participants.length = 0;
      $scope.contest.criteria.length = 0;
      $scope.showOverlay = false;
      $scope.showAward = false;
    };

    $scope.closeAward = function() {
      $scope.showOverlay = false;
      $scope.showAward = false;
    };

    $scope.finish = function () {
      var max = 0,
        winner;

      for (var i = 0; i < contest.participants.length; i++) {
        var pValue = 0;
        for (var j = 0; j < contest.participants[i].criteria.length; j++) {
          pValue += contest.participants[i].criteria[j].value;
        }
        if (pValue > max) {
          max = pValue;
          winner = contest.participants[i];
        }
        pValue = 0;
      }

      $scope.showOverlay = true;
      $scope.showAward = true;
      $scope.winnerMsg = 'Congratulations ' + winner.name + ', you won with ' + max + ' points!!!!';

    };

    $scope.$watch('participants + criteria', function () {
      $scope.disableFinish = $scope.participants.length === 0 || $scope.criteria.length === 0;
      $scope.disableClearAll = $scope.participants.length === 0 && $scope.criteria.length === 0;
    });

    $scope.showAward = false;
    $scope.showOverlay = false;
    $scope.disableFinish = true;
    $scope.disableClearAll = true;
  }
]);
