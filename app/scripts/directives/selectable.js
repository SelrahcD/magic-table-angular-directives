angular.module('selectable', [])
    .directive('selectableSet', function() {
        return {
            restrict: 'A',
            scope: {
                selectableElements: '=',
                selectedElements: '='
            },
            controller: function($scope) {

                var lastClickedIndex,
                    shifftedSelectedElements = [];

                this.toggleSelection = function(index) {
                    lastClickedIndex = index;
                    shifftedSelectedElements.length = 0;

                    if(!angular.isArray($scope.selectedElements)){
                        return;
                    }

                    var element = getElementAtIndex(index);

                    if(isElementSelected(element)) {
                        unselectElement(element);
                    }
                    else {
                        selectElement(element);
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
                };

                this.shiftedClick = function(index) {
                    if(typeof lastClickedIndex !== undefined) {
                        toggleRangeUpTo(lastClickedIndex, index);
                    }
                };

                function toggleRangeUpTo(firstIndex, lastIndex) {
     
                    var lastElement = getElementAtIndex(lastIndex),
                        min = Math.min(firstIndex, lastIndex),
                        max = Math.max(firstIndex, lastIndex),
                        element;

                    angular.forEach(shifftedSelectedElements, function(element, index) {
                        unselectElement(element);
                    });

                    if(isElementSelected(lastElement)) {

                        for(var i = min; i <= max; i++) {
                            element = getElementAtIndex(i);
                            unselectElement(element);
                        }

                        lastClickedIndex = lastIndex;
                        shifftedSelectedElements.length = 0;
                    }
                    else {
                        shifftedSelectedElements.length = 0;
                        for(var i = min; i <= max; i++) {
                            element = getElementAtIndex(i);
                            selectElement(element);
                            shifftedSelectedElements.push(element);
                        }
                    }
                };

                function getElementAtIndex(index) {
                    return $scope.selectableElements[index];
                };

                function isElementSelected(element) {
                    return $scope.selectedElements.indexOf(element) > -1;
                };

                function selectElement(element) {
                    if(!isElementSelected(element)) {
                        $scope.selectedElements.push(element);
                    }
                };

                function unselectElement(element) {
                    var index = $scope.selectedElements.indexOf(element);
                    if(index > -1) {
                        // console.log(element);
                        $scope.selectedElements.splice(index, 1);
                    }
                };
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

                element.on('click', function(event) {
                    scope.$apply(function() {
                        handleClick(event);
                    });
                });

                function handleClick(event) {
                    if(event.shiftKey) {
                        selectableSetCtrl.shiftedClick(scope.$index);
                    }
                    else if(event.ctrlKey || angular.element(event.toElement)[0].type === 'checkbox') {
                        selectableSetCtrl.toggleSelection(scope.$index);
                    }
                }

            }
        }
    })
    .directive('selectBox', function() {
        return {
            restrict: 'E',
            require: '^selectable',
            template: '<div><input type="checkbox" ng-model="selected"/></div>'
        }
    })
    .directive('selectAll', function() {
        return {
            restrict: 'E',
            require: '^selectableSet',
            scope: true,
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