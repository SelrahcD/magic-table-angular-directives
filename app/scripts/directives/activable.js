'use strict';

angular.module('activable', [])
    .directive('activableSet', function() {
        return {
            restrict: 'A',
            scope: {
                activeElement: '=',
                activeChange: '='
            },
            controller: ['$scope', function($scope) {
               var activeElement;

               $scope.$watch('activeElement', function(newActiveElement) {
                    activeElement = newActiveElement;
               });
               
               this.toggleActive = function(element, value) {
                   if(value !== activeElement) {

                       if(angular.isFunction($scope.activeChange)) {
                           $scope.activeChange(value, activeElement);
                       }

                       if(typeof $scope.activeElement !== 'undefined') {
                           $scope.activeElement = value;
                       }

                       activeElement = value;
                   }
                   else {
                       if(angular.isFunction($scope.activeChange)) {
                           $scope.activeChange(undefined, activeElement);
                       }

                       if(typeof $scope.activeElement !== 'undefined') {
                           $scope.activeElement = undefined;
                       }

                       activeElement = undefined;
                   }
               };

               this.getActiveElement = function() {
                  return activeElement;
               }
            }]
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