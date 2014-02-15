'use strict';

angular.module('splitItApp')
  .controller('PurchasesCtrl', function ($scope, peopleService, purchasesService, debtSettler) {
    
    $scope.purchaseData = purchasesService;
    $scope.ious = {};


    $scope.getPersonNameByUuid = function( uuid ){
      var person =  peopleService.getPersonByUuid(uuid);
      if(person){
        return person.fullName;
      } else {
        return "Unknown Person";
      }
    };

    $scope.removePurchase = function( purchase ){
      $scope.purchaseData.removePurchase(purchase);
    };

    $scope.toggleEdit = function(purchase){
      if( purchase.hasOwnProperty('editMode') && purchase.editMode ){
        purchase.editMode = false;
      } else {
        purchase.editMode = true;
      }
    };

    $scope.calculateIous = function(purchases){
      var ious = debtSettler.purchases_to_transfers(purchases);
      // Round dollar amounts
      _.each(ious, function(value, key){
        ious[key].amount = Math.round(ious[key].amount * 100)/100;
      });
      $scope.ious = ious;
    };

  });
