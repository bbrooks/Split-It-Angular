'use strict';

angular.module('splitItApp')

.controller('PurchaseFormCtrl', function($scope, peopleService){

	$scope.people = peopleService.people;
	$scope.purchase = {}

	$scope.addPurchase = function(newPurchase){
		var sanitizedPurchase = sanitize( newPurchase );
		$scope.purchase = sanitizedPurchase;
	};

	var sanitize = function( purchase ){
		var cleanPurchase = {};

		//Check for neccessary fields
		cleanPurchase.description = purchase.description;
		cleanPurchase.purchaser = purchase.payer.uuid;
		cleanPurchase.splitBetween = _.pluck(purchase.owers, 'uuid');
		cleanPurchase.purchaseDate = new Date(purchase.date);
		cleanPurchase.cost = parseFloat(purchase.amount);

		return cleanPurchase;
	};

})	

.directive('purchaseForm', function () {
	return {
		templateUrl: 'views/purchaseform.html',
		restrict: 'E',
		scope: {
			submit: '@submit'
		},
		controller: 'PurchaseFormCtrl'
	};
});
