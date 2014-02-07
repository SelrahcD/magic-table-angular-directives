'use strict';

angular.module('workspaceApp')
  .controller('ChangeCtrl', function ($scope) {

    $scope.username = "SelrahcD";

    $scope.onChange = function() {
        console.log('onChange', $scope.username);
    };

  });
            