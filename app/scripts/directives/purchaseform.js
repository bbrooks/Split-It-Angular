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

		if( purchase.hasOwnProperty('uuid') ){
			var promise = purchasesService.editPurchase(purchase).then(function(){
				aPurchase.editMode = false; 
			});
		} else {
			var promise = purchasesService.addPurchase(purchase).then(function(){
				// reset form
				$scope.aPurchase = angular.copy(purchaseFormDefaultState);
			});
		}

		// Reset Form to pristine
		promise.then(function(){
			$scope.purchaseForm.$setPristine();
		});
	};

	function buildPurchase( purchase ){
		

		// @Todo: check for required attrs.
		// Assign data to model
		var cleanPurchase = angular.copy(purchase);

		// Clean up metadata
		if( cleanPurchase.hasOwnProperty('editMode') )
			delete(cleanPurchase.editMode);
		
		return cleanPurchase;
	}

	function purchaseToFormData( purchase ){
		var formData = angular.copy(purchase);
		return formData;
	}

});