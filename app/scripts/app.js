'use strict';

angular.module('splitItApp', [
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/purchases.html',
        controller: 'PurchasesCtrl'
      })
      .when('/people', {
        templateUrl: 'views/people.html',
        controller: 'PeopleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
