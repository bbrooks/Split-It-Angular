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

    //Add in some fake data
    scope.people = [
      { fullName: 'Joe Blogs', uuid: '1' },
      { fullName: 'Jane Doe', uuid: '2' },
      { fullName: 'Bob Barker', uuid: '3' },
      { fullName: 'Fourth Man', uuid: '4' }
    ];

  }));

  it('should be able to add people', function (){
    var initialLength = scope.people.length;
    var newPerson = {'fullName':'Yo Yo'};
    scope.addPerson(newPerson);
    expect(scope.people.length).toBe(initialLength+1);
    expect(_.last(scope.people)).toBe(newPerson);
  });

  it('should be able to remove people', function (){
    var initialLength = scope.people.length;
    scope.removePerson(scope.people[0]);
    expect(scope.people.length).toBe(initialLength-1);
  });

  it('should be able to edit people', function (){
    scope.editPerson(scope.people[0], {fullName: 'Tommy'});
    expect(scope.people[0].fullName).toBe('Tommy');
  });

});
