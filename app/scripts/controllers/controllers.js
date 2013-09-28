'use strict';

var app = angular.module('QC');

app.controller('MainCtrl', [
        '$scope',
        'localStorageService',
        function ($scope, localStorageService) {
            // Start fresh
            var pIndex = 0,
                pPrefix = "p"+pIndex,
                cIndex = 0,
                cPrefix = "c"+cIndex,
                participantsArray,
                categoriesArray;

            $scope.categoryOptions = [{name:'5 Stars'}, {name:'1/10'}, {name:'1/100'}];
            $scope.cType = $scope.categoryOptions[0];

            $scope.addParticipant = function () {
                if ($scope.pName !== "") {
                    var newParticipant = {name: $scope.pName};
                    $scope.participants.push(newParticipant);
                    localStorageService.add(pPrefix, newParticipant);
                    pPrefix = "p" + ++pIndex;
                    $scope.pName = "";
                }
            };

            $scope.participants = (function(){
                if(!participantsArray){
                    participantsArray = [];
                    var i = 0,
                        ix = "p"+i;
                    while(localStorageService.get(ix)){
                        participantsArray.push(localStorageService.get(ix));
                        ix = "p"+ ++i;
                    }
                    pIndex = i;
                }
                return participantsArray;
            })();

            $scope.addCategory = function () {
                if ($scope.cName !== "") {
                    var newCategory = {name: $scope.cName, type: $scope.cType};
                    $scope.categories.push(newCategory);
                    localStorageService.add(cPrefix, newCategory);
                    cPrefix = "c" + ++cIndex;
                    $scope.cName = "";
                }
            };

            $scope.categories = (function(){
                if(!categoriesArray){
                    categoriesArray = [];
                    var i = 0,
                        ix = "c"+i;
                    while(localStorageService.get(ix)){
                        categoriesArray.push(localStorageService.get(ix));
                        ix = "c" + ++i;
                    }
                    cIndex = i;
                }
                return categoriesArray;
            })();

            $scope.pKeyPressed = function(evt){
                $scope.addParticipant();
            };

            $scope.cKeyPressed = function(evt){
                $scope.addCategory();
            };

        }]);
