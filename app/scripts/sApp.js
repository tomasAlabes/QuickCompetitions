'use strict';

angular.module('LocalStorageModule').value('prefix', 'qc-');

angular.module('QC', ['LocalStorageModule', /*'ngCookies' ,*/'ui.keypress', 'QC.directives', 'QC.services'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })/*.run(function($cookieStore){
    $cookieStore.put('XSRF-TOKEN', 'MyToken');
  })*/;
