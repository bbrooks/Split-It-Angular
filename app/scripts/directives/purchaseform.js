'use strict';

angular.module('splitItApp')

.directive('purchaseForm', function () {
	return {
		templateUrl: 'views/purchaseform.html',
		restrict: 'E',
		scope: {
			submitLabel: '@',
			purchase: '@'
		},
		controller: 'PurchaseFormCtrl'
	};
})

.controller('PurchaseFormCtrl', function($scope, peopleService){

	$scope.people = peopleService.people;

	var purchaseFormDefaultState = {
		date: getTodayStr(),
		owers: _.pluck(peopleService.people, 'uuid')
	};
	
	// Set Defaults
	$scope.newPurchase = angular.copy(purchaseFormDefaultState);

	$scope.addPurchase = function(newPurchase){
		$scope.purchase = buildPurchase( newPurchase );

		// Reset Form
		$scope.newPurchase = angular.copy(purchaseFormDefaultState);
		$scope.purchaseForm.$setPristine();
	};

	function buildPurchase( purchase ){
		var cleanPurchase = {};

		//Check for neccessary fields
		var required_attrs = [
			'description',
			'payer',
			'owers',
			'date',
			'amount'
		];

		// @Todo: check for required attrs.

		// Assign data to model
		cleanPurchase.description = purchase.description;
		cleanPurchase.purchaser = purchase.payer;
		cleanPurchase.splitBetween = purchase.owers;
		cleanPurchase.purchaseDate = new Date(purchase.date);
		cleanPurchase.cost = parseFloat(purchase.amount);

		return cleanPurchase;
	}

	function getTodayStr(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = yyyy+'-'+mm+'-'+dd;

		return today;
	}

});