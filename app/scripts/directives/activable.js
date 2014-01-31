angular.module('activable', [])
    .directive('activableSet', function() {
        return {
            restrict: 'A',
            scope: {
                activeElement: '=',
                activeChange: '='
            },
            controller: function($scope) {

                this.toggleActive = function(element, value) {
                    if(value !== $scope.activeElement) {
                        if(angular.isFunction($scope.activeChange)) {
                            $scope.activeChange(value, $scope.activeElement);
                        }

                        $scope.activeElement = value;
                    }
                    else {
                        if(angular.isFunction($scope.activeChange)) {
                            $scope.activeChange(undefined, $scope.activeElement);
                        }

                        $scope.activeElement = undefined;
                    }
                };

                this.getActiveElement = function() {
                   return $scope.activeElement;
                }
            }
        };
    })
    .directive('activable', function() {
        return {
            restrict: 'A',
            require: '^activableSet',
            scope: true,
            link: function(scope, element, attr, activableSetCtrl) {
                
                // We need the collection used in the ng-repeat directive
                // and we can't access it so just do as ng-repeat does...
                var expression = attr.ngRepeat;
                var match = expression.match(/^\s*(.+)\s+in\s+(.*)\s*$/),
                    lhs, valueIdent;
                lhs = match[1];
                match = lhs.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
                valueIdent = match[3] || match[1];

                scope.$watch(function() { return activableSetCtrl.getActiveElement(); }, function(newActiveElement, oldActiveElement) {

                    if(scope[valueIdent] === newActiveElement) {
                        element.addClass('active');
                    }
                    else {
                        element.removeClass('active');
                    }
                });

                element.on('click', function(event) {
                    if(!$(event.toElement).parents('.block-active').length && !event.ctrlKey && ! event.shiftKey) {
                        scope.$apply(function() {
                            activableSetCtrl.toggleActive(element, scope[valueIdent]);
                        });
                    }
                });
            }
        }
    });