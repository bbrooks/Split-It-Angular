	'use strict';

	angular.module('splitItApp')

	.controller('PersonListCtrl', function($scope, peopleService){

		$scope.peopleData = peopleService;

		$scope.removePerson = function(person){
			peopleService.removePerson( person );
		};

		$scope.toggleEdit = function(person){
			if( person.hasOwnProperty('editMode') && person.editMode ){
				person.editMode = false;
			} else {
				person.editMode = true;
			}
		};

		$scope.editPerson = function(person){
			
			if( person.hasOwnProperty('editMode') )
				delete(person.editMode);

			peopleService.editPerson( person );

		};

	})

	.directive('personList', function () {
		return {
			templateUrl: 'views/personList.html',
			restrict: 'E',
			scope: {
				people: '='
			},
			controller: 'PersonListCtrl'
		};
	});
