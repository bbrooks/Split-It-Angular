'use strict';

angular.module('splitItApp')

.directive('purchaseForm', function () {
	return {
		templateUrl: 'views/purchaseform.html',
		restrict: 'E',
		scope: {
			submitLabel: '@',
			originalPurchase: '='
		},
		controller: 'PurchaseFormCtrl'
	};
})

.controller('PurchaseFormCtrl', function($scope, peopleService, purchasesService){

	$scope.people = peopleService.people;

	// Define default form data
	var purchaseFormDefaultState = {
		purchaseDate: new Date().getTime(),
		splitBetween: _.pluck(peopleService.people, 'uuid')
	};
	
	// Overwrite defaults if we got passed a purchase to populate with
	if( $scope.originalPurchase ){
		purchaseFormDefaultState = purchaseToFormData($scope.originalPurchase);
	} 

	// Populate form with data
	$scope.aPurchase = angular.copy( purchaseFormDefaultState );

	$scope.addOrUpdatePurchase = function(aPurchase){
		 var purchase = buildPurchase( aPurchase );

		if( purchase.hasOwnProperty('uuid') )
			purchasesService.editPurchase(purchase);
		else
			purchasesService.addPurchase(purchase);

		// Reset Form
		$scope.aPurchase = angular.copy(purchaseFormDefaultState);
		$scope.purchaseForm.$setPristine();
	};

	function buildPurchase( purchase ){
		// @Todo: check for required attrs.
		// Assign data to model
		var cleanPurchase = angular.copy(purchase);
		return cleanPurchase;
	}

	function purchaseToFormData( purchase ){
		var formData = angular.copy(purchase);
		return formData;
	}

});