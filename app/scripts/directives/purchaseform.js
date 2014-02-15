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

	var purchaseFormDefaultState = {
		purchaseDate: getToday(),
		splitBetween: _.pluck(peopleService.people, 'uuid')
	};
	
	// If we've got form data available to us, populate using that
	if( $scope.originalPurchase ){
		$scope.aPurchase = purchaseToFormData($scope.originalPurchase);
	} else {
		// Otherwise use default data
		$scope.aPurchase = angular.copy( purchaseFormDefaultState );
	}

	$scope.addPurchase = function(aPurchase){
		 var purchase = buildPurchase( aPurchase );

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

	function getToday(){

		var date = new Date();
		var dd = date.getDate();
		var mm = date.getMonth()+1; //January is 0!

		var yyyy = date.getFullYear();
		if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} date = yyyy+'-'+mm+'-'+dd;

		return date;
	}

});