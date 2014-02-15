'use strict';

angular.module('splitItApp')
  .controller('PurchasesCtrl', function ($scope, peopleService, purchasesService, debtSettler) {
    
    $scope.purchaseData = purchasesService;


    $scope.getPersonNameByUuid = function( uuid ){
      var person =  peopleService.getPersonByUuid(uuid);
      if(person){
        return person.fullName;
      } else {
        return "Unknown Person";
      }
    };

    $scope.removePurchase = function( purchase ){
      $scope.purchasesData.removePurchase(purchase);
    };

    $scope.toggleEdit = function(purchase){
      if( purchase.hasOwnProperty('editMode') && purchase.editMode ){
        purchase.editMode = false;
      } else {
        purchase.editMode = true;
      }
    };

    $scope.calculatePayments = function(purchases){
      var ious = debtSettler.purchases_to_transfers(purchases);
      console.log(ious);
    };

  });
