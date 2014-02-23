  'use strict';

  angular.module('splitItApp')
  .factory('peopleService', function (apigeeCollection) {

    // Set up the database connection
    var peopleCollection = apigeeCollection('people');

    // Initial population of data from DB
    peopleCollection.all().then(function( people ){
      PeopleService.people = people;
    });

    var PeopleService = {

      people: {},

      all: function () {
        return this.people;
      },

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

      editPerson: function( person ){
        if( ! this.isValidPerson( person ) ) 
          return;

        peopleCollection.update( person )
          .then(
            function( response ){
            },
            function( err ){
              alert(err);
            }
          );

      },

      addPersonLocal: function(person){


        // Get highest uuid
        var lastPerson = _.max(this.people, function(person){ return person.uuid } );
        
        if( lastPerson < 0 ){
          lastPerson = { uuid: 0 };
        }

        //Assign next
        person.uuid = parseInt(lastPerson.uuid, 10)+1;
        //Add to array
        this.people.push(person);

      },


        removePersonLocal: function(personToRemove){
          this.people = _.reject(this.people, function(person){
            return person.uuid == personToRemove.uuid 
          });
        },

        editPersonLocal: function(person){
          var matchingPersonIndex = this.getPersonIndexByUuid( person.uuid );
          this.people[matchingPersonIndex] = person;
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
