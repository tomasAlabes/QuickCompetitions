'use strict';

angular.module('LocalStorageModule').value('prefix', 'qc-');

angular.module('QC', ['LocalStorageModule', 'ui.keypress', 'QC.directives', 'QC.services'])
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
