'use strict';

angular.module('splitItApp')
	.controller('PeopleCtrl', function ($scope, peopleService) {

		$scope.peopleData = peopleService;

		$scope.addPerson = function( newPerson ){
			return peopleService.addPerson( angular.copy( newPerson ) ).then(
				function(){
					newPerson.fullName = '';
				}
			);
		};

	});
