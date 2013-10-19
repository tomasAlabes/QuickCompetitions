'use strict';

var services = angular.module('QC.services', ['ngResource']);

services.factory('Competition', ['$resource', function ($resource) {
  return $resource('/competitions/:id', {id: '@id'});
}]);