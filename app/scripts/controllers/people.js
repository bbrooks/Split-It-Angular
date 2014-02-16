'use strict';

angular.module('splitItApp')
  .controller('PeopleCtrl', function ($scope, peopleService) {

  	$scope.peopleData = peopleService;

  	$scope.addPerson = function( newPerson ){
  		peopleService.addPerson( angular.copy( newPerson ) );
  		newPerson.fullName = '';
  	};

  });
