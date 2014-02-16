'use strict';

angular.module('splitItApp')
  .controller('PurchasesCtrl', function ($scope, peopleService, purchasesService, debtSettler) {
    
    $scope.purchaseData = purchasesService;
    $scope.peopleData = peopleService;
    $scope.ious = {};

    $scope.calculateIous = function(purchases){
      var ious = debtSettler.purchases_to_transfers(purchases);
      // Round dollar amounts
      _.each(ious, function(value, key){
        ious[key].amount = Math.round(ious[key].amount * 100)/100;
      });
      $scope.ious = ious;
    };

  });
