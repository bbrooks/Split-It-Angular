'use strict';

angular.module('splitItApp')
.directive('purchaseList', function () {
	return {
		controller: 'purchaseListCtrl',
		templateUrl: 'views/purchaseList.html',
		restrict: 'E',
		scope:{
			purchases: '='
		}
	};
})

.controller('purchaseListCtrl', [ '$scope', 'peopleService', 'purchasesService', function($scope, peopleService, purchasesService){

	$scope.purchaseData = purchasesService;
	$scope.peopleData = peopleService;

	$scope.toggleEdit = function(purchase){
		if( purchase.hasOwnProperty('editMode') && purchase.editMode ){
			purchase.editMode = false;
		} else {
			purchase.editMode = true;
		}
	};

}]);
