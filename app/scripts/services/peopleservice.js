'use strict';

angular.module('splitItApp')
  .factory('peopleService', function () {

    return {

      people: [
        { fullName: 'Joe Blogs', uuid: '1' },
        { fullName: 'Jane Doe', uuid: '2' },
        { fullName: 'Bob Barker', uuid: '3' }
      ],

      all: function () {
        return this.people;
      },

      addPerson: function(person){

        // Get highest uuid
        var lastPerson = _.max(this.people, function(person){ return person.uuid } );
        //Assign next
        person.uuid = parseInt(lastPerson.uuid, 10)+1;
        //Add to array
        this.people.push(person);

      },

      removePerson: function(personToRemove){
        this.people = _.reject(this.people, function(person){
          return person.uuid == personToRemove.uuid 
        });
      },

      editPerson: function(person){
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

      }

    };
  });
