'use strict';

angular.module('splitItApp')
.factory('purchasesService', function (apigeeCollection) {

    // Set up the database connection
    var purchasesCollection = apigeeCollection('purchases');

    // Initial population of data from DB
    purchasesCollection.all().then(function( purchases ){
      PurchasesService.purchases = purchases;
    });

    var PurchasesService = {

      purchases: [],

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
            this.purchases.push(purchaseAdded)
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
            this.purchases = _.reject(this.purchases, function(aPurchase){
              return purchase.uuid == aPurchase.uuid; 
            });
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
          angular.noop,
          function( err ){
            alert(err);
          }
        );

      },

      addLocalPurchase: function(purchase){
        // Get highest uuid
        var lastPurchase = _.max(this.purchases, function(purchase){ return purchase.uuid } );
        
        if( lastPurchase < 0 ){
          lastPurchase = { uuid: 0 };
        }

        //Assign next
        purchase.uuid = parseInt(lastPurchase.uuid, 10)+1;
        
        //Add to array
        this.purchases.push(purchase);
      },

      removeLocalPurchase: function(purchaseToRemove){
        this.purchases = _.reject(this.purchases, function(purchase){
          return purchase.uuid == purchaseToRemove.uuid 
        });
      },

      editLocalPurchase: function(purchase){
        var matchingPurchaseIndex = this.getPurchaseIndexByUuid( purchase.uuid );
        this.purchases[matchingPurchaseIndex] = purchase;
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
