'use strict';

describe('Controller: MainCtrl', function () {

// load the controller's module
  beforeEach(module('QC'));

  var MainCtrl,
    scope;

// Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, localStorageService) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      localStorageService: localStorageService
    });
  }));

  it('should start with an empty contest', function () {
    expect(scope.contest.participants.length).toBe(0);
    expect(scope.contest.criteria.length).toBe(0);
  });

  it('should add a participant', function(){
    scope.pName = 'Tomi';
    scope.addParticipant();
    expect(scope.contest.participants.length).toBe(1);
    expect(scope.pName).toBe('');
  });

  it('should add a criteria', function(){
    scope.cName = 'Fun';
    scope.addCriterion();
    expect(scope.contest.criteria.length).toBe(1);
    expect(scope.cName).toBe('');
  });

});
