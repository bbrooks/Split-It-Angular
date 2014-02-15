'use strict';

angular.module('splitItApp')
  .factory('purchasesService', function () {
    return {

      purchases: [
        {
            "uuid": 1,
            "description": "Milk, eggs, spam",
            "purchaser": "1",
            "cost": 63,
            "splitBetween": ["1","2"],
            "purchaseDate": "2008-06-05"
        },
        {
            "uuid": 2,
            "description": "Yogurt, bananas",
            "purchaser": "1",
            "cost": 20,
            "splitBetween": ["1" ,"2" ,"3"],
            "purchaseDate": "2008-11-07"
        },
        {
            "uuid": 3,
            "description": "science, for real",
            "purchaser": "2",
            "cost": 12,
            "splitBetween": ["1","2","3"],
            "purchaseDate": "1990-11-27"
        }
      ],

      addPurchase: function(purchase){
        // Get highest uuid
        var lastPurchase = _.max(this.purchases, function(purchase){ return purchase.uuid } );
        
        //Assign next
        purchase.uuid = parseInt(lastPurchase.uuid, 10)+1;
        
        //Add to array
        this.purchases.push(purchase);
      },

      removePurchase: function(purchaseToRemove){
        this.purchases = _.reject(this.purchases, function(purchase){
          return purchase.uuid == purchaseToRemove.uuid 
        });
      },

      editPurchase: function(purchase){
        var matchingPurchaseIndex = this.getPurchaseIndexByUuid( purchase.uuid );
        this.purchases[matchingPurchaseIndex] = purchase;
      },

      getPurchaseIndexByUuid: function( uuid ){

        var matchingPurchase = _.findWhere( this.purchases, {uuid: uuid} );

        return _.indexOf(this.purchases, matchingPurchase);

      }

    };
  });
