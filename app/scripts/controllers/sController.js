'use strict';

var app = angular.module('QC');

app.controller('MainCtrl', [
  '$scope',
  'Competition',
  function ($scope, Competition) {

    function Participant(name) {
      this.name = name;
      this.criteria = [];
    }

    function Criterion(name, category) {
      this.name = name;
      this.type = category.type;
      this.maxValue = category.maxValue;
      this.value = 1;
    }

    function initApp(){
      $scope.criteria = competition.criteria;
      $scope.participants = competition.participants;
      $scope.$watch('participants + criteria', function () {
        $scope.disableFinish = $scope.participants.length === 0 || $scope.criteria.length === 0;
        $scope.disableClearAll = $scope.participants.length === 0 && $scope.criteria.length === 0;
      });
    }

    // Start fresh
    var competition = $scope.competition = Competition.get({id: 1}, initApp) || (new Competition({ participants: [], criteria: [] }) && initApp());

    $scope.criteriaOptions = [
      {type: '1/5', 'maxValue': 5},
      {type: '1/10', 'maxValue': 10},
      {type: '1/100', 'maxValue': 100}
    ];
    $scope.cType = $scope.criteriaOptions[0];

    $scope.addParticipant = function () {
      if ($scope.pName) {
        var newParticipant = new Participant($scope.pName);
        competition.participants.push(newParticipant);

        for (var i = 0; i < competition.criteria.length; i++) {
          newParticipant.criteria.push(angular.copy(competition.criteria[i]));
        }

        $scope.pName = '';
        competition.$save();
      }
    };


    $scope.addCriterion = function () {
      if ($scope.cName) {
        var newCategory = new Criterion($scope.cName, $scope.cType);
        competition.criteria.push(newCategory);

        for (var i = 0; i < competition.participants.length; i++) {
          competition.participants[i].criteria.push(angular.copy(newCategory));
        }

        $scope.cName = '';
        competition.$save();
      }
    };


    $scope.pKeyPressed = function () {
      $scope.addParticipant();
    };

    $scope.cKeyPressed = function () {
      $scope.addCriterion();
    };

    $scope.clearAll = function () {
      competition.$delete();
      $scope.competition.participants.length = 0;
      $scope.competition.criteria.length = 0;
      $scope.showOverlay = false;
      $scope.showAward = false;
    };

    var fireworksSound = document.getElementById('fireworks');

    $scope.closeAward = function() {
      $scope.showOverlay = false;
      $scope.showAward = false;
      fireworksSound.pause();
      fireworksSound.currentTime = 0;
    };

    function calculateWinner() {
      var max = 0,
        winners = [];

      var participantsLength = competition.participants.length;
      for (var i = 0; i < participantsLength; i++) {
        var pValue = 0,
          currentParticipant = competition.participants[i],
          participantCriteriaLength = currentParticipant.criteria.length;

        for (var j = 0; j < participantCriteriaLength; j++) {
          pValue += currentParticipant.criteria[j].value / currentParticipant.criteria[j].maxValue;
        }

        pValue = pValue / participantCriteriaLength;

        if (pValue > max) {
          max = pValue;
          winners.length = 0;
          winners.push(currentParticipant.name);
        }else if(pValue === max){
          winners.push(currentParticipant.name);
        }

        pValue = 0;
      }

      return {max: max, winners: winners};
    }

    $scope.finish = function () {
      var win = calculateWinner(),
        max = win.max,
        winners = win.winners.join();

      fireworksSound.play();

      $scope.showOverlay = true;
      $scope.showAward = true;
      $scope.winnerMsg = 'Congratulations ' + winners + ', you won with ' + Math.round(max*100) + '% efficiency!!!!';
    };

    $scope.showAward = false;
    $scope.showOverlay = false;
    $scope.disableFinish = true;
    $scope.disableClearAll = true;
  }
]);

