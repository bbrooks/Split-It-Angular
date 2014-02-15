'use strict';

angular.module('splitItApp')
  .factory('purchasesService', function () {
    return {

      purchases: [
        {
            "uuid": 0,
            "description": "fugiat amet voluptate ipsum qui",
            "purchaser": "1",
            "cost": 63,
            "splitBetween": [1,2,3],
            "purchaseDate": "2008-06-05T03:15:35 +07:00"
        },
        {
            "uuid": 1,
            "description": "consequat aute esse deserunt sint",
            "purchaser": "1",
            "cost": 20,
            "splitBetween": [1,2,3],
            "purchaseDate": "2008-11-07T02:09:48 +08:00"
        },
        {
            "uuid": 2,
            "description": "sunt culpa consectetur ad pariatur",
            "purchaser": "2",
            "cost": 12,
            "splitBetween": [1,2,3],
            "purchaseDate": "1990-11-27T17:49:13 +08:00"
        }
      ],

      addPurchase: function(purchase){
        // Get highest uuid
        var lastPurchase = _.max(this.purchases, function(purchase){ return purchase.uuid } );
        
        //Assign next
        purchase.uuid = parseInt(lastPurchase.uuid, 10)+1;
        
        //Add to array
        this.purchases.push(purchase);
      }

    };
  });
