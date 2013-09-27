'use strict';

angular.module('LocalStorageModule').value('prefix', 'qc-');

angular.module('QuickCompetitionApp', ['LocalStorageModule', 'ui.keypress'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
