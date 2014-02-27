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

		// Takes all the purchases and reduce them to a set of IOUs that people can fulfill.
		$scope.calculateIous = function(purchases){

			// Convert purchases to individual transfers between people
			var ious = debtSettler.purchases_to_transfers(purchases);
			
			// Round dollar amounts to two decimal points
			_.each(ious, function(value, key){
				ious[key].amount = Math.round(ious[key].amount * 100)/100;
			});

			$scope.ious = ious;
		};

		/**
		 * Clears the date fields and the purchases array
		 */
		$scope.clearPurchases = function(){
			delete($scope.startDate);
			delete($scope.endDate);
			purchasesService.purchases = [];
		};

		/**
		 * Populates the purchases array with puchases made between two timestamps
		 * @param  {int} startDate Timestamp of the beginning of the date range
		 * @param  {int} endDate   Timestamp of the end of the date range
		 */
		$scope.getPurchasesByDateRange = function(startDate, endDate){
			
			// If we've got no valid dates, empty out purchases array
			if( typeof startDate === 'undefined' || typeof endDate === 'undefined' ){
				purchasesService.purchases = [];
			} else {
				// Otherwise, set the date range and query the DB
				purchasesService.setDateRange(startDate, endDate);
				purchasesService.getPurchases();
			}

		};

	});
