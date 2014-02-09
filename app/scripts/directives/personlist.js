'use strict';

angular.module('splitItApp')

 .controller('PersonListCtrl', function($scope){

    $scope.people = [
      { fullName: 'Joe Blogs', uuid: '1' },
      { fullName: 'Jane Doe', uuid: '2' },
      { fullName: 'Bob Barker', uuid: '3' }
    ];

    $scope.addPerson = function(person){
      $scope.people.push( person );
    };

    $scope.removePerson = function(person){
      $scope.people = _.without($scope.people, person);
    };

    $scope.toggleEdit = function(person){
      if( person.hasOwnProperty('editMode') && person.editMode ){
        person.editMode = false;
      } else {
        person.editMode = true;
      }
    };

    $scope.editPerson = function( person, updatedPerson ){
      person.fullName = updatedPerson.fullName;
      $scope.toggleEdit( person );
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
