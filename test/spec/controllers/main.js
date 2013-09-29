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
    expect(scope.contest.categories.length).toBe(0);
  });
});
