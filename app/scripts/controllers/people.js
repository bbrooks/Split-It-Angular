'use strict';

angular.module('splitItApp')
  .controller('PeopleCtrl', function ($scope, peopleService) {

  	$scope.addPerson = function( newPerson ){
  		peopleService.addPerson( angular.copy( newPerson ) );
  		newPerson.fullName = '';
  	};

  });
