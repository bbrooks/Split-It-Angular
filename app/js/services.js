'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('splitItApp.services', [])

  // Returns an array of roomate objects
  .factory('Roomates', function(){
    //@todo: get from storage;
    return [
      { id: 1, name: 'Tom'},
      { id: 2, name: 'Joey'},
      { id: 3, name: 'Rosy'},
      { id: 4, name: 'Sam'}
    ];
  })


  // Return an array of transaction objects
  .factory('Transactions', function(){
    //@todo: get from storage;
    return [
      {
        name: 'Spaceship (from craigslist)',
        amount: 900,
        lender: 'Rosy',
        borrowers: ['Sam','Tom']
      },
      {
        name: 'Milk',
        amount: 5,
        lender: 'Joey',
        borrowers: ['Sam','Tom', 'Rosy']
      },
      {
        name: 'Cheese',
        amount: 120,
        lender: 'Joey',
        borrowers: ['Sam']
      },
      {
        name: 'Balloons',
        amount: 25,
        lender: 'Tom',
        borrowers: ['Rosy', 'Sam']
      }
    ];
  })

  // Does the fancy math requires to reduce a set of group purchases 
  // into a small set of requires transfers between two people.
  .factory('DebtSettler', function(){

    var debtSettler = {

      /**
       * Takes an array of transactions and scrunches them
       * down to the smallest number of transfers between
       * two people required to settle all the debts
       * 
       * @param  array transactions An array of transactions ex.
       * { name: 'Spaceship', amount: 9000000, lender: 'Rosy', borrowers: ['Sam','Tom'] }
       *
       * @return object All the transfers between two people that must occur to settle
       * debts incurred from the transactions.
       */
      transactions_to_transfers: function( transactions ) {

        var master_ious = [];

        // Generate ious from transactions
        _.each(transactions, function (transaction) {
          var ious = debtSettler.transaction_to_ious(transaction.amount, transaction.lender, transaction.borrowers);
          master_ious.push(ious);
          master_ious = _.flatten(master_ious);
        });

        // Sum up ious
        var ious_summed = {};

        _.each(master_ious, function (iou) {
          var iou_name = iou.borrower + ' and ' + iou.lender;

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
       * Takes a transaction and calculates the
       * individual IOUs between two people that it implies
       * @param  int amount Amount of the transaction
       * @param  str lender The name of the person who paid for the purchase
       * @param  array borrowers Array of names of the people who will split this purchase
       * @return array IOUs in the form of { lender: "Joe", borrower: "Tom", amount: "10" }
       */
      transaction_to_ious: function( amount, lender, borrowers ) {

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