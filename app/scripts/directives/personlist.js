'use strict';

angular.module('splitItApp')

 .controller('PersonListCtrl', function($scope, peopleService){

    $scope.peopleService = peopleService;
    $scope.people = peopleService.people;
    
    $scope.$watchCollection('peopleService.people', function(){
      $scope.people = peopleService.people;
    });

    $scope.addPerson = function(person){
      peopleService.addPerson( person );
    };

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

    $scope.editPerson = function( person, updatedPerson ){
      peopleService.editPerson( person, updatedPerson );
      person.editMode = false;
    };

 })

.directive('personList', function () {
    return {
      templateUrl: 'views/personList.html',
      restrict: 'E',
      scope: {},
      controller: 'PersonListCtrl'
    };
  });
