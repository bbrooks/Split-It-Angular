'use strict';

angular.module('splitItApp')
  .factory('debtSettler', function () {

    var debtSettler = {

      /**
       * Takes an array of purchases and scrunches them
       * down to the smallest number of transfers between
       * two people required to settle all the debts
       * 
       * @param  array n array of purchases ex.
       * { description: 'Spaceship', cost: 9000000, purchaser: 'person-uuid-1', splitBetween: ['person-uuid-1','person-uuid-2'] }
       *
       * @return object All the transfers between two people that must occur to settle
       * debts incurred from the purchases.
       */
      purchases_to_transfers: function( purchases ) {

        var master_ious = [];

        // Generate ious from purchases
        _.each(purchases, function (purchase) {
          var ious = debtSettler.purchase_to_ious(purchase.cost, purchase.purchaser, purchase.splitBetween);
          master_ious.push(ious);
          master_ious = _.flatten(master_ious);
        });

        // Sum up ious
        var ious_summed = {};

        _.each(master_ious, function (iou) {
          var iou_name = iou.borrower + '_' + iou.lender;

          if (!ious_summed.hasOwnProperty(iou_name)) {
            ious_summed[iou_name] = {
              amount: 0,
              lender: iou.lender,
              borrower: iou.borrower
            };
          }

          ious_summed[iou_name]['amount'] += iou.amount;

        });

        // Reverse names for those with negative ious
        _.each(ious_summed, function (iou, key) {

          if (iou.amount > 0) return;

          var new_borrower = iou.lender,
            new_lender = iou.borrower;

          ious_summed[key]['lender'] = new_lender;
          ious_summed[key]['borrower'] = new_borrower;
          ious_summed[key]['amount'] = iou.amount * -1;
        });

        return ious_summed;

      },

      /**
       * Takes a purchase and calculates the
       * individual IOUs between two people that it implies
       * @param  int amount Amount of the purchase
       * @param  str lender The name of the person who paid for the purchase
       * @param  array borrowers Array of names of the people who will split this purchase
       * @return array IOUs in the form of { lender: "Joe", borrower: "Tom", amount: "10" }
       */
      purchase_to_ious: function( amount, lender, borrowers ) {

        borrowers = _.without(borrowers, lender);
        var ious = [];

        // Calculate borrowers' share
        var share = amount / (borrowers.length + 1);

        _.each(borrowers, function (borrower) {

          // We sort the lender and the borrower
          // alphabetically, and negate the amount
          // if we have to switch. This is so we can
          // combine IOUs more easily later
          var iou = {};

          if (lender > borrower) {
            iou = {
              lender: lender,
              borrower: borrower,
              amount: share
            };
          } else {
            iou = {
              lender: borrower,
              borrower: lender,
              amount: share * -1
            };
          }

          ious.push(iou);

        });

        return ious;

      }
    };

    return debtSettler;

  });
