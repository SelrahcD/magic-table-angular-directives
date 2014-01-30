angular.module('sortable', [])
    .directive('sortableSet', function() {
        return {
            restrict: 'A',
            scope: {
                reverseSort: '=',
                sortBy: '='
            },
            controller: function($scope) {
                $scope.reverseSort = $scope.reverseSort || false;

                this.sortBy = function(key) {
                    if(key == $scope.sortBy) {
                        $scope.reverseSort = !$scope.reverseSort;
                        console.log($scope.re);
                    }
                    else {
                        $scope.reverse = false;
                        $scope.sortBy = key;
                    }
                };

                this.getSortKey = function() {
                    return $scope.sortBy;
                };

                this.isSortReversed = function() {
                    return $scope.reverseSort;
                };
            }
        };
    })
    .directive('sortable', function() {
        return {
            restrict: 'A',
            require: '^sortableSet',
            link: function(scope, element, attr, sortableSetCtrl) {
                var key = attr.sortable;
                var element =angular.element(element); 
                
                element.addClass('sortable sort');

                scope.$watch(function() { return sortableSetCtrl.getSortKey();}, function() {
                    setClasses();
                });

                scope.$watch(function() { return sortableSetCtrl.isSortReversed();}, function() {
                    setClasses();
                });
                
                element.on('click', function() {
                    scope.$apply(function() {
                        sortableSetCtrl.sortBy(key);
                    });
                });

                function setClasses() {
                    if(sortableSetCtrl.getSortKey() === key){
                        element.removeClass('no-sort');
                        if(sortableSetCtrl.isSortReversed()) {
                            element.removeClass('sort-down').addClass('sort-up');
                        }
                        else {
                            element.removeClass('sort-up').addClass('sort-down');
                        }
                    }
                    else {
                        element.removeClass('sort-up sort-down').addClass('no-sort');
                    }
                }
            }
        }
    });