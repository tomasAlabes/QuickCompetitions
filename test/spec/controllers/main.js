'use strict';

describe('Controller: MainCtrl', function () {

// load the controller's module
  beforeEach(module('QC'));

  var MainCtrl,
    scope,
    localStorage;

// Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, localStorageService) {
    scope = $rootScope.$new();
    localStorage = localStorageService;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      localStorageService: localStorageService
    });
  }));

  beforeEach(function(){
    scope.clearAll();
  });

  function createParticipant(name) {
    scope.pName = name;
    scope.addParticipant();
    scope.$apply('participants');
  }

  function createCriterion(name) {
    scope.cName = name;
    scope.addCriterion();
    scope.$apply('criteria');
  }

  it('should start with an empty competition', function () {
    expect(scope.competition.participants.length).toBe(0);
    expect(scope.competition.criteria.length).toBe(0);
    expect(scope.disableFinish).toBeTruthy();
    expect(scope.disableClearAll).toBeTruthy();
    expect(scope.showAward).toBeFalsy();
  });

  it('should add a participant', function(){
    createParticipant('Tomi');
    expect(scope.competition.participants.length).toBe(1);
    expect(scope.pName).toBe('');
    expect(scope.showAward).toBeFalsy();
    expect(scope.disableFinish).toBeTruthy();
    expect(scope.disableClearAll).toBeFalsy();
  });

  it('should add a criteria', function(){
    createCriterion('Fun');
    expect(scope.competition.criteria.length).toBe(1);
    expect(scope.cName).toBe('');
    expect(scope.showAward).toBeFalsy();
    expect(scope.disableFinish).toBeTruthy();
    expect(scope.disableClearAll).toBeFalsy();
  });

  it('should save the competition with 1 participant and 1 criterion', function(){
    createParticipant('Tomi');
    createCriterion('Fun');
    scope.save();
    var contest = localStorage.get('contest');
    expect(contest.participants.length).toBe(1);
    expect(contest.criteria.length).toBe(1);
    expect(contest.participants[0].criteria.length).toBe(1);
  });

  it('should clear the competition from localstorage and scope', function(){
    createParticipant('Tomi');
    createCriterion('Fun');
    scope.save();
    scope.clearAll();
    var contest = localStorage.get('contest');
    expect(contest).toBeNull();
    expect(scope.competition.participants.length).toBe(0);
    expect(scope.competition.criteria.length).toBe(0);
    expect(scope.showAward).toBeFalsy();
  });

  it('should win the participant with more points', function(){
    createParticipant('Tomi');
    createParticipant('Chu');
    createCriterion('Fun');
    createCriterion('Original');
    scope.competition.participants[0].criteria[0].value = 5;
    scope.competition.participants[0].criteria[1].value = 10;
    scope.competition.participants[1].criteria[0].value = 10;
    scope.competition.participants[1].criteria[1].value = 15;
    scope.finish();
    expect(scope.winnerMsg).toBe('Congratulations Chu, you won with 25 points!!!!');
    expect(scope.showAward).toBeTruthy();
  });

});
