'use strict';

describe('Service: peopleService', function () {

  // load the service's module
  beforeEach(module('splitItApp'));

  // instantiate service
  var peopleService;
  beforeEach(inject(function (_peopleService_) {
    peopleService = _peopleService_;
  }));

  // @Todo: rewrite with mocked backend
  // describe('Adding a Person', function(){

  //   var newPerson = {'fullName':'Yo Yo'};

  //   it('should provide the addPerson method', function(){
  //     expect(typeof peopleService.addPerson).toBe('function');
  //   });

  //   it('should increase length of peopleService.people by 1', function (){
  //     var initialLength = peopleService.people.length;
  //     peopleService.addPerson(newPerson);
  //     expect(peopleService.people.length).toBe(initialLength+1);
  //   });

  //   it('should add a person with the correct name', function(){
  //     peopleService.addPerson(newPerson);
  //     var personAdded = _.last(peopleService.people);
  //     expect(personAdded.fullName).toBe(newPerson.fullName);
  //   });

  // }); // Adding a Person

  // describe('Removing a Person', function(){

  //   it('should provide the removePerson method', function(){
  //     expect(typeof peopleService.removePerson).toBe('function');
  //   });

  //   it('should reduce length of peopleService.people by 1', function (){
  //     var initialLength = peopleService.people.length;
  //     peopleService.removePerson(peopleService.people[0]);
  //     expect(peopleService.people.length).toBe(initialLength-1);
  //   });

  // }); // Removing a Person

  // describe('Editing a Person', function(){

  //   it('should provide the editPerson method', function(){
  //     expect(typeof peopleService.editPerson).toBe('function');
  //   });

  //   it('should update a person with new attributes', function (){/*@todo*/});

  // }); // Editing a Person

  describe('Helper Functions', function(){
    it('getPersonIndexByUuid should get a person\'s index by their uuid', function(){/*@todo*/});
    it('getPersonByUuid should get a person by their uuid', function(){/*@todo*/});
  }); // Helper Functions

});
