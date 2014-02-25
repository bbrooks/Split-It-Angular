'use strict';

angular.module('splitItApp')
  .controller('PurchasesCtrl', function ($scope, peopleService, purchasesService, debtSettler, $rootScope) {
    
    $scope.purchaseData = purchasesService;
    $scope.peopleData = peopleService;
    $scope.ious = {};

    // Default search dates to beginning and end of month
    $scope.startDate = new Date( new Date().getFullYear(), new Date().getMonth(), 1).getTime();
    $scope.endDate = new Date( new Date().getFullYear(), new Date().getMonth() + 1, 0).getTime();

    //Initial default query for purchases;
    purchasesService.setDateRange($scope.startDate, $scope.endDate);
    purchasesService.getPurchases().then(function(){
      $rootScope.initialPurchasesLoaded = true;
    });

    $scope.calculateIous = function(purchases){
      var ious = debtSettler.purchases_to_transfers(purchases);
      // Round dollar amounts
      _.each(ious, function(value, key){
        ious[key].amount = Math.round(ious[key].amount * 100)/100;
      });
      $scope.ious = ious;
    };

    $scope.clearPurchases = function(){
      delete($scope.startDate);
      delete($scope.endDate);
      purchasesService.purchases = [];
    };

    $scope.getPurchasesByDateRange = function(startDate, endDate){
      
      if( typeof startDate === 'undefined' || typeof endDate === 'undefined' ){
        purchasesService.purchases = [];
      } else {
        purchasesService.setDateRange(startDate, endDate);
        purchasesService.getPurchases();
      }

    };

  });
