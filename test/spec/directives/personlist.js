'use strict';

describe('Controller: PersonListCtrl', function () {

  // load the controller's module
  beforeEach(module('splitItApp'));

  var PersonListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    
    scope = $rootScope.$new();
    PersonListCtrl = $controller('PersonListCtrl', {
      $scope: scope
    });

  }));

  // @Todo: rewrite with mocked backend
  // it('should be able to remove people', function (){
  //   var initialLength = scope.peopleData.people.length;
  //   scope.removePerson(scope.peopleData.people[0]);
  //   scope.$digest();
  //   expect(scope.peopleData.people.length).toBe(initialLength-1);
  // });

  // it('should be able to edit people', function (){
  //   var personToEdit = angular.copy(scope.peopleData.people[0]);
  //   personToEdit.fullName = 'Tommy';
  //   scope.editPerson(personToEdit);
  //   expect(scope.peopleData.people[0].fullName).toBe('Tommy');
  // });

});
