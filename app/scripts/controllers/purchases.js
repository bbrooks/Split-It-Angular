'use strict';

angular.module('splitItApp')
  .controller('PurchasesCtrl', function ($scope, peopleService, purchasesService) {
    
    $scope.getPersonNameByUuid = function( uuid ){
      var person =  peopleService.getPersonByUuid(uuid);
      if(person){
        return person.fullName;
      } else {
        return "Unknown Person";
      }
    };

    // Some sample purchases
    $scope.purchases = purchasesService.purchases;

    $scope.$watchCollection('purchasesService.people', function(){
      $scope.purchases = purchasesService.purchases;
    });

  });
