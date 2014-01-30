'use strict';

angular.module('workspaceApp')
  .controller('MainCtrl', function ($scope, $http) {
    
    $scope.filterOptions = {
           filterText: "",
           useExternalFilter: false
       };

    $scope.sortInfo = { fields: [], directions: [], columns: []};

       $scope.totalServerItems = 0;
       $scope.pagingOptions = {
           pageSizes: [5, 10, 20],
           pageSize: 5,
           currentPage: 1
       };

       $scope.setPagingData = function(data, page, pageSize){   
           var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
           $scope.myData = pagedData;
           $scope.pagingOptions.currentPage = page;
           $scope.totalServerItems = data.length;
           if (!$scope.$$phase) {
               $scope.$apply();
           }
       };
       $scope.getPagedDataAsync = function (pageSize, page, searchText) {
           setTimeout(function () {
            console.log('Ajax call');
               var data;
               if (searchText) {
                   var ft = searchText.toLowerCase();
                   $http.get('largeLoad.json').success(function (largeLoad) {       
                       data = largeLoad.filter(function(item) {
                           return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                       });
                       $scope.setPagingData(data,page,pageSize);
                   });            
               } else {
                   $http.get('largeLoad.json').success(function (largeLoad) {
                       $scope.setPagingData(largeLoad,page,pageSize);
                   });
               }
           }, 100);
       };
    
       $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    
       $scope.$watch('pagingOptions', function (newVal, oldVal) {
           if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
             $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
           }
       }, true);
       $scope.$watch('filterOptions', function (newVal, oldVal) {
           if (newVal !== oldVal) {
             $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
           }
       }, true);

       $scope.$watch('sortInfo', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            console.log('Sort changed');
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, 1, $scope.filterOptions.filterText);
        }
       }, true);
    
       $scope.gridOptions = {
           data: 'myData',
           enablePaging: true,
           showFooter: true,
           totalServerItems:'totalServerItems',
           useExternalSorting: true,
           sortInfo: $scope.sortInfo,
           showSelectionCheckbox: true,
           pagingOptions: $scope.pagingOptions,
           filterOptions: $scope.filterOptions,
           plugins: []
       };

  });
