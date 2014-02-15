'use strict';

angular.module('splitItApp')
  .controller('PurchasesCtrl', function ($scope, peopleService, purchasesService) {
    
    // Get purchases
    $scope.purchases = purchasesService.purchases;
    
    // Watch for changes
    $scope.purchasesService = purchasesService;
    $scope.$watchCollection('purchasesService.purchases', function(){
      $scope.purchases = purchasesService.purchases;
    });

    $scope.getPersonNameByUuid = function( uuid ){
      var person =  peopleService.getPersonByUuid(uuid);
      if(person){
        return person.fullName;
      } else {
        return "Unknown Person";
      }
    };

    $scope.removePurchase = function( purchase ){
      purchasesService.removePurchase(purchase);
    };

    $scope.toggleEdit = function(purchase){
      if( purchase.hasOwnProperty('editMode') && purchase.editMode ){
        purchase.editMode = false;
      } else {
        purchase.editMode = true;
      }
    };

  });
