'use strict';

angular.module('splitItApp')
.factory('purchasesService', function (apigeeService, apigeeCollection, localCollection) {

		if( apigeeService.isConfigured ) {
			// Set up the database connection
			var purchasesCollection = apigeeCollection('purchases');
		} else {
			var purchasesCollection = localCollection('purchases');
		}

		var PurchasesService = {

			purchases: [],
			startTime: undefined,
			endTime: undefined,

			/**
			 * Sets the date range for all purchase queries
			 * @param  {str} startDate Date string to mark the beginning of the range
			 * @param  {[type]} endDate   Date string to mark the end of the range
			 */
			setDateRange: function( startDate, endDate ){

				if( typeof startDate === 'undefined' || typeof endDate === 'undefined' )
					return;

				//@Todo: check for date validity;
				this.startTime = this.dateCorrected( startDate ).setHours(0,0,0,0);
				this.endTime = this.dateCorrected( endDate ).setHours(23, 59, 59);

			},

			/**
			 * Gets purchases in the configured date range
			 * @return {promise} Promise resolves with an array of purchases
			 */
			getPurchases: function(){

				var start = parseInt(this.startTime, 10);
				var end = parseInt(this.endTime, 10);

				if( isNaN(start) || isNaN(end) )
					return;

				if( end <= start )
					return;

				var queryStr = 'select * where purchaseDate >= ' + start + ' && purchaseDate <= ' + end;

				return purchasesCollection.query( queryStr ).then(
					function( purchases ){
						PurchasesService.purchases = purchases;
					}
				);

			},

			/**
			 * Accounts for timezone in a provided dateStr
			 * @param  {str} dateStr
			 * @return {Date} 
			 * @todo  DRY with date-input directive
			 */
			dateCorrected: function( dateStr ){
				var timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
				var timeStamp = new Date(dateStr).getTime();
				var correctedDate = new Date( timeStamp + timezoneOffset );
				return correctedDate; 
			},

			/**
			 * Add a purchase to the purchases list
			 * @param  {obj} purchase Purchase to add
			 * @return {promise} A promise that is resolved when the purchase is added to the database
			 */
			 addPurchase: function(purchase){
				if( typeof purchase === 'undefined' ) 
					return;

				return purchasesCollection.add(purchase)
				.then(
					function( purchaseAdded ){
						this.getPurchases();
					}.bind(this), 
					function( err ){
						alert( err );
					}
				);
			},

			/**
			 * Remove a purchase from the apigee collection
			 * and the local purchase array
			 * 
			 * @param  {obj} purchase
			 * @return {promise} Promise that is resolved when a purchase is deleted from the database
			 */
			 removePurchase: function(purchase){

				if( ! this.isValidPurchase( purchase ) ) 
					return;

				return purchasesCollection.remove(purchase.uuid)
				.then(
					function(){
						this.getPurchases();
					}.bind(this),
					function( err ){
						alert( err );
					}
					);
			},

			/**
			 * Updates a purchase's info based on its uuid
			 * @param  {obj} purchase 
			 * @return {promise} Promise that resolves when the purchase is updated in the database
			 */
			 editPurchase: function( purchase ){

				if( ! this.isValidPurchase( purchase ) ) 
					return;

				return purchasesCollection.update( purchase )
				.then(
					function( updatedPurchase ){
						this.getPurchases();
					}.bind(this),
					function( err ){
						alert(err);
					}
				);

			},

			getPurchaseIndexByUuid: function( uuid ){

				var matchingPurchase = _.findWhere( this.purchases, {uuid: uuid} );

				return _.indexOf(this.purchases, matchingPurchase);

			},

			isValidPurchase: function( purchase ){

				if( typeof purchase === 'undefined' ) 
					return false;

				if( !purchase.hasOwnProperty('uuid') )
					return false;

				return true;

			}

		};

		return PurchasesService;

	});
