  'use strict';

  angular.module('splitItApp')
  
  .factory('peopleService', function (apigeeCollection, $rootScope) {

    // Set up the database connection
    var peopleCollection = apigeeCollection('people');

    // Initial population of data from DB
    peopleCollection.all().then(function( people ){
      PeopleService.people = people;
      $rootScope.initialPeopleLoaded = true;
    });

    var PeopleService = {

      people: [],

      /**
       * Add a person to the people list
       * @param  {obj} person Person to add
       * @return {promise} A promise that is resolved when the person is added to the database
       */
       addPerson: function(person){

        if( typeof person === 'undefined' ) 
          return;

        return peopleCollection.add(person)
        .then(
          function( personAdded ){
            this.people.push(personAdded)
          }.bind(this), 
          function( err ){
            alert( err );
          }
        );
      },

      /**
       * Remove a person from the apigee collection
       * and the local people array
       * 
       * @param  {obj} person
       * @return {promise} Promise that is resolved when a person is deleted from the database
       */
       removePerson: function( person ){

        if( ! this.isValidPerson( person ) ) 
          return;

        return peopleCollection.remove(person.uuid)
        .then(
          function(){
            this.people = _.reject(this.people, function(aPerson){
              return person.uuid == aPerson.uuid 
            });
          }.bind(this),
          function( err ){
            alert( err );
          }
        );
      },

      /**
       * Updates a person's info based on their uuid
       * @param  {obj} person 
       * @return {promise} Promise that resolves when the person is updated in the database
       */
       editPerson: function( person ){

        if( ! this.isValidPerson( person ) ) 
          return;

        return peopleCollection.update( person )
        .then(
          function( response ){
          },
          function( err ){
            alert(err);
          }
        );

      },

      getPersonIndexByUuid: function( uuid ){

        var matchingPerson = _.findWhere( this.people, {uuid: uuid} );

        return _.indexOf(this.people, matchingPerson);

      },

      getPersonByUuid: function( uuid ){

        var matchingPerson = _.findWhere( this.people, {uuid: uuid} );

        if( typeof matchingPerson !== 'undefined' ){
          return matchingPerson;
        } else {
          return false;
        }

      },

      getPersonNameByUuid: function( uuid ){
        var person =  this.getPersonByUuid(uuid);
        if(person){
          return person.fullName;
        } else {
          return "Person " + uuid;
        }
      },

      isValidPerson: function( person ){

        if( typeof person === 'undefined' ) 
          return false;

        if( !person.hasOwnProperty('uuid') )
          return false;

        return true;

      }

    };

    return PeopleService;

  });
