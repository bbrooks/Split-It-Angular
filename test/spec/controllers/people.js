'use strict';

describe('Controller: PeopleCtrl', function () {

  // load the controller's module
  beforeEach(module('splitItApp'));

  var PeopleCtrl, scope, peopleService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');
    
    scope = $rootScope.$new();
    PeopleCtrl = $controller('PeopleCtrl', {
      $scope: scope
    });

    peopleService = $injector.get('peopleService');

  }));

  it('should provide the addPerson method', function(){
    expect(typeof scope.addPerson).toBe('function');
  });

  describe('Adding a Person', function(){

    it('should increase length of peopleService.people by 1', function (){
      var initialLength = peopleService.people.length;
      scope.addPerson({ fullName: 'JoJo Jones'});
      expect(peopleService.people.length).toBe(initialLength+1);
    });

  }); // Adding a Person

});
