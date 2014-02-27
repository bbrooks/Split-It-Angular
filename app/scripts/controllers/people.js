'use strict';

angular.module('splitItApp')

	.controller('PeopleCtrl', function ($scope, peopleService) {

		$scope.peopleData = peopleService;
		/**
		 * Adds a person to the databse and clears the add field
		 * @param  {object} newPerson Person to add to the DB
		 */
		$scope.addPerson = function( newPerson ){
			return peopleService.addPerson( angular.copy( newPerson ) ).then(
				function(){
					// Clear the add person field
					newPerson.fullName = '';
				}
			);
		};

	});
