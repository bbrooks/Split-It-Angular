'use strict';

angular.module('splitItApp')
  .directive('personList', function () {
    return {
      templateUrl: 'views/personList.html',
      restrict: 'E',
      scope: {},
      controller: function($scope){

      	$scope.people = [
      		{ fullName: 'Joe Blogs', uuid: '1' },
      		{ fullName: 'Jane Doe', uuid: '2' },
      		{ fullName: 'Bob Barker', uuid: '3' }
      	];

      	$scope.removePerson = function(person){
      		$scope.people = _.without($scope.people, person);
      	};

      },
      link: function postLink(scope, element, attrs) {}
    };
  });
