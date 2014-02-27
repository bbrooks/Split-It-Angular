'use strict';

angular.module('splitItApp', [
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'ngAnimate',
	'apigee'
])
	.value('APIGEE_CONFIG', {})
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
	}) // route config

	.config(function($httpProvider){
		$httpProvider.interceptors.push(function($q, $rootScope, $timeout){
			return{
				request: function(config){
					$rootScope.notification = '<div class="alert alert-info">Loading...</div>';
					return config || $q.when(config);
				},
				requestError: function(rejection){
					$rootScope.notification = '<div class="alert alert-warning">There was an error</div>';
					$timeout(function(){$rootScope.notification = '';}, 1000);
					return $q.reject(rejection);
				},
				response: function(response){
					$timeout(function(){$rootScope.notification = '';}, 500);
					return response || $q.when(response);
				},
				responseError: function(rejection){
					return $q.reject(rejection);
					$rootScope.notification = '<div class="alert alert-warning">There was an error</div>';
					$timeout(function(){$rootScope.notification = '';}, 1000);
				},
			};
		});
	}); // http interceptor config
