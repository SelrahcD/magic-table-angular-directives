angular.module('selectable', [])
    .directive('selectableSet', function() {
        return {
            restrict: 'A',
            scope: {
                selectableElements: '=',
                selectedElements: '='
            },
            controller: function($scope) {
                this.toggleSelection = function(value) {
                    if(!angular.isArray($scope.selectedElements)){
                        return;
                    }

                    var index = $scope.selectedElements.indexOf(value);

                    if(index > -1) {
                        $scope.selectedElements.splice(index, 1);
                    }
                    else {
                        $scope.selectedElements.push(value);
                    }
                };

                this.toggleSelectAll = function() {
                    if(!angular.isArray($scope.selectedElements) || !angular.isArray($scope.selectableElements)) {
                        return;
                    }
                    if($scope.selectedElements.length === $scope.selectableElements.length){
                        $scope.selectedElements.length = 0;
                    }
                    else {
                        var index;
                        angular.forEach($scope.selectableElements, function(element) {
                            index = $scope.selectedElements.indexOf(element);
                            if(index === -1) {
                                $scope.selectedElements.push(element);
                            }
                        });
                    }
                };

                this.isAllSelected = function() {
                    if(angular.isArray($scope.selectableElements)){
                        return $scope.selectedElements.length === $scope.selectableElements.length;
                    }   
                };

                this.getSelectedElements = function() {
                    return $scope.selectedElements;
                }
            }
        };
    })
    .directive('selectable', function() {
        return {
            restrict: 'A',
            require: '^selectableSet',
            link: function(scope, element, attr, selectableSetCtrl) {
                // We need the collection used in the ng-repeat directive
                // and we can't access it so just do as ng-repeat does...
                var expression = attr.ngRepeat;
                var match = expression.match(/^\s*(.+)\s+in\s+(.*)\s*$/),
                    lhs, valueIdent;
                lhs = match[1];
                match = lhs.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
                valueIdent = match[3] || match[1];

                scope.$watchCollection(function() { return selectableSetCtrl.getSelectedElements(); }, function(newSelection, oldSelection) {

                    if(newSelection.indexOf(scope[valueIdent]) > -1) {
                        scope.selected = true;
                    }
                    else {
                        scope.selected = false;
                    }
                });

                scope.toggleSelection = function() {
                    selectableSetCtrl.toggleSelection(scope[valueIdent]);             
                }

            }
        }
    })
    .directive('selectBox', function() {
        return {
            restrict: 'E',
            require: '^selectable',
            template: '<div><input type="checkbox" ng-click="toggleSelection()" ng-model="selected"/></div>'
        }
    })
    .directive('selectAll', function() {
        return {
            restrict: 'E',
            require: '^selectableSet',
            template: '<div><input type="checkbox" ng-click="toggleSelectAll()" ng-model="allSelected"/></div>',
            link: function(scope, element, attr, selectableSetCtrl) {
                scope.toggleSelectAll = function () {
                    selectableSetCtrl.toggleSelectAll();
                }

                scope.$watch(function() { return selectableSetCtrl.isAllSelected();}, function(isAllSelected) {
                    scope.allSelected = isAllSelected;
                });
            }
        }
    });