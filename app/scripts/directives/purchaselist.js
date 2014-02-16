'use strict';

angular.module('splitItApp')
.directive('purchaseList', function () {
	return {
		controller: 'purchaseListCtrl',
		templateUrl: 'views/purchaselist.html',
		restrict: 'E',
		scope:{
			purchases: '='
		}
	};
})

.controller('purchaseListCtrl', function($scope, peopleService, purchasesService){

	$scope.purchaseData = purchasesService;
	$scope.peopleData = peopleService;

	$scope.toggleEdit = function(purchase){
		if( purchase.hasOwnProperty('editMode') && purchase.editMode ){
			purchase.editMode = false;
		} else {
			purchase.editMode = true;
		}
	};

});
