'use strict';

var app = angular.module('QC');

app.controller('MainCtrl', [
        '$scope',
        'localStorageService',
        function ($scope, localStorageService) {
            // Start fresh
            var contest = $scope.contest = localStorageService.get('contest') || {
                "participants": [],
                "categories": []
            };

            $scope.categories = contest.categories;
            $scope.participants = contest.participants;
            $scope.categoryOptions = [{type:'1/5', "maxValue": 5}, {type:'1/10', "maxValue": 10}, {type:'1/100', "maxValue": 100}];
            $scope.cType = $scope.categoryOptions[0];

            function randomId(){
                return Math.floor(Math.random() * 10000000000);
            }

            function Participant (name){
                this.id = randomId();
                this.name = name;
                this.categories = [];
            }

            function Category (name, category){
                this.id = randomId();
                this.name = name;
                this.type = category.type;
                this.maxValue = category.maxValue;
            }

            $scope.save = function() {
                localStorageService.set('contest', contest);
            };

            $scope.addParticipant = function () {
                var newParticipant = new Participant($scope.pName);
                contest.participants.push(newParticipant);

                for (var i = 0; i < contest.categories.length; i++) {
                    newParticipant.categories.push(contest.categories[i]);
                }

                $scope.pName = "";
                $scope.save();
            };


            $scope.addCategory = function () {
                var newCategory = new Category($scope.cName, $scope.cType);
                contest.categories.push(newCategory);

                for (var i = 0; i < contest.participants.length; i++) {
                    var newC = new Category($scope.cName, $scope.cType);
                    newC.value = 0;
                    contest.participants[i].categories.push(newC);
                }

                $scope.cName = "";
                $scope.save();
            };


            $scope.pKeyPressed = function(evt){
                $scope.addParticipant();
            };

            $scope.cKeyPressed = function(evt){
                $scope.addCategory();
            };

            $scope.clearAll = function(){
                localStorageService.clearAll();
                $scope.contest.participants.length = 0;
                $scope.contest.categories.length = 0;
            }

            $scope.finish = function(){
                var max = 0,
                    winner;

                for (var i = 0; i < contest.participants.length; i++) {
                    var pValue = 0;
                    for (var j = 0; j < contest.participants[i].categories.length; j++) {
                        pValue += contest.participants[i].categories[j].value;
                    }
                    if(pValue > max){
                        max = pValue;
                        winner = contest.participants[i];
                    }
                    pValue = 0;
                }

                $scope.showWinner = true;
                $scope.winnerMsg = "Congratulations " + winner.name + ", you won with " + max + " points!!!!";

            }

            $scope.showWinner = false;

        }]);
