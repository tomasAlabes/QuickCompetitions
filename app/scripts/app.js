'use strict';

angular.module('LocalStorageModule').value('prefix', 'qc-');

angular.module('QC', ['LocalStorageModule', 'ui.keypress', 'QC.directives'])
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
