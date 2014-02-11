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

  it('should be able to remove people', function (){
    var initialLength = scope.people.length;
    scope.removePerson(scope.people[0]);
    scope.$digest();
    expect(scope.people.length).toBe(initialLength-1);
  });

  it('should be able to edit people', function (){
    scope.editPerson(scope.people[0], {fullName: 'Tommy'});
    expect(scope.people[0].fullName).toBe('Tommy');
  });

});
