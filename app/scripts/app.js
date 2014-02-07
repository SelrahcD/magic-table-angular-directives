'use strict';

angular.module('workspaceApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngGrid',
  'activable',
  'selectable',
  'sortable'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/maison', {
        templateUrl: 'views/maison.html',
        controller: 'MaisonCtrl'
      })
      .when('/change', {
        templateUrl: 'views/change.html',
        controller: 'ChangeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
