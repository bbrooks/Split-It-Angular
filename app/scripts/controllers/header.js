'use strict';

angular.module('splitItApp')

	/**
	 * A controller for determining the current page
	 * which will be used to highlight a navbar element
	 */
	.controller('HeaderCtrl', ['$scope', '$location', function ($scope, $location) {
		
		$scope.$location = $location;

		$scope.isNavbarActive = function (navBarPath) {
			var currentPath = $scope.$location.path();
			return navBarPath === currentPath;
		};

	}]);
