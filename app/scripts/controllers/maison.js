'use strict';

angular.module('workspaceApp')
  .controller('MaisonCtrl', function ($scope) {

    $scope.activeChangeAA = function(newActiveElement, oldActiveElement) {
        console.log('New active', newActiveElement, $scope.activeElementAA);
    };

    $scope.sortChangedAA = function(sortKey, reverseSort) {
        console.log(sortKey, reverseSort, $scope.sortByAA, $scope.reverseSortAA);
    }

    $scope.records = [
        {"name": "Tiancum", "allowance": 53,  "paid": false},
        {"name": "Jacob", "allowance": 27,  "paid": false},
        {"name": "Nephi", "allowance": 29,  "paid": false},
        {"name": "Enos", "allowance": 34,  "paid": false},
        {"name": "Ether", "allowance": 42,  "paid": false},
        {"name": "Alma", "allowance": 43,  "paid": true},
        {"name": "Jared", "allowance": 21,  "paid": true},
        {"name": "Moroni", "allowance": 50,  "paid": true},
        {"name": "Tiancum", "allowance": 53,  "paid": false},
        {"name": "Jacob", "allowance": 27,  "paid": false},
        {"name": "Nephi", "allowance": 29,  "paid": false},
        {"name": "Enos", "allowance": 34,  "paid": false}];

    $scope.recordsBB = [
        {"name": "Ether", "allowance": 42,  "paid": false},
        {"name": "Alma", "allowance": 43,  "paid": true},
        {"name": "Jared", "allowance": 21,  "paid": true},
        {"name": "Moroni", "allowance": 50,  "paid": true}];
    
    $scope.activeElementAA =  $scope.records[0];
    $scope.selectedElementsAA = [$scope.records[2], $scope.records[6]];
    $scope.sortByAA = 'paid';
    $scope.reverseSortAA = true;

    $scope.activeElementBB =  $scope.records[0];
    $scope.selectedElementsBB = [$scope.recordsBB[1], $scope.recordsBB[3]];
    $scope.sortByBB = 'paid';
    $scope.reverseSortBB = true;

    $scope.addSomeMoreRecords = function() {
        $scope.records = $scope.records.concat([
            {"name": "Alma", "allowance": 43,  "paid": true},
            {"name": "Jared", "allowance": 21,  "paid": true},
            {"name": "Moroni", "allowance": 50,  "paid": true},
            {"name": "Tiancum", "allowance": 53,  "paid": false},
            {"name": "Jacob", "allowance": 27,  "paid": false},
            {"name": "Nephi", "allowance": 29,  "paid": false},
            {"name": "Enos", "allowance": 34,  "paid": false},
            {"name": "Ether", "allowance": 42,  "paid": false},
            {"name": "Alma", "allowance": 43,  "paid": true},
            {"name": "Jared", "allowance": 21,  "paid": true},
            {"name": "Moroni", "allowance": 50,  "paid": true},
            {"name": "Tiancum", "allowance": 53,  "paid": false},
            {"name": "Jacob", "allowance": 27,  "paid": false},
            {"name": "Nephi", "allowance": 29,  "paid": false},
            {"name": "Enos", "allowance": 34,  "paid": false},
            {"name": "Ether", "allowance": 42,  "paid": false}]
        );
    };

    $scope.changeRandomActiveRecord = function() {
        var max = $scope.records.length -1,
            index = Math.floor(Math.random() * max);

        $scope.activeElementAA = $scope.records[index];
    };

    $scope.toggleRandomSelectedRecord = function() {
        var max = $scope.records.length -1,
            index = Math.floor(Math.random() * max),
            indexInSelection;

        indexInSelection = $scope.selectedElementsAA.indexOf($scope.records[index]);
        if(indexInSelection > -1) {
            $scope.selectedElementsAA.splice(indexInSelection, 1);
        }
        else {
            $scope.selectedElementsAA.push($scope.records[index]);
        }
        
    };

    $scope.changeRandomActiveRecordBB = function() {
        var max = $scope.records.length -1,
            index = Math.floor(Math.random() * max);

        $scope.activeElementBB = $scope.records[index];
    };

    $scope.toggleRandomSelectedRecordBB = function() {
        var max = $scope.records.length -1,
            index = Math.floor(Math.random() * max),
            indexInSelection;

        indexInSelection = $scope.selectedElementsBB.indexOf($scope.records[index]);
        if(indexInSelection > -1) {
            $scope.selectedElementsBB.splice(indexInSelection, 1);
        }
        else {
            $scope.selectedElementsBB.push($scope.records[index]);
        }
        
    };
  });
            