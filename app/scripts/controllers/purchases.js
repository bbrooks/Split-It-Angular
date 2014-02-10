'use strict';

angular.module('splitItApp')
  .controller('PurchasesCtrl', function ($scope, peopleService) {
    
    $scope.getPersonNameByUuid = function( uuid ){
      var person =  peopleService.getPersonByUuid(uuid);
      if(person){
        return person.fullName;
      } else {
        return "Unknown Person";
      }
    };

    // Some sample purchases
    $scope.purchases = [
      {
          "uuid": 0,
          "description": "fugiat amet voluptate ipsum qui",
          "purchaser": "1",
          "cost": 63,
          "splitBetween": "",
          "purchaseDate": "2008-06-05T03:15:35 +07:00"
      },
      {
          "uuid": 1,
          "description": "consequat aute esse deserunt sint",
          "purchaser": "1",
          "cost": 20,
          "splitBetween": "",
          "purchaseDate": "2008-11-07T02:09:48 +08:00"
      },
      {
          "uuid": 2,
          "description": "sunt culpa consectetur ad pariatur",
          "purchaser": "2",
          "cost": 12,
          "splitBetween": "",
          "purchaseDate": "1990-11-27T17:49:13 +08:00"
      },
      {
          "uuid": 3,
          "description": "elit id nisi nulla commodo",
          "purchaser": "3",
          "cost": 21,
          "splitBetween": "",
          "purchaseDate": "2008-05-04T02:47:19 +07:00"
      },
      {
          "uuid": 3,
          "description": "veniam nulla amet irure proident",
          "purchaser": "10",
          "cost": 38,
          "splitBetween": "",
          "purchaseDate": "1997-08-13T16:24:32 +07:00"
      }
    ];

  });
