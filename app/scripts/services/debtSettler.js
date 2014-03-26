'use strict';

angular.module('splitItApp')
  .factory('debtSettler', function () {

    var debtSettler = {

      /**
       * Takes an array of purchases and scrunches them
       * down to the smallest number of transfers between
       * people required to settle all the debts
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

        // Calculate total balances for individuals
        var balances = {};

        _.each(master_ious, function (iou) {

          if( ! balances.hasOwnProperty(iou.lender) )
            balances[iou.lender] = 0;

          if( ! balances.hasOwnProperty(iou.borrower) )
            balances[iou.borrower] = 0;

          balances[iou.lender] += iou.amount;

          balances[iou.borrower] -= iou.amount;

        });

        // Turn into arrays of people for easier sorting      
        var lenders = [];
        var borrowers = [];
        _.each(balances, function(balance, id){
          var person = {id: id, balance: balance};

          if( balance > 0 )
            lenders.push(person);
          else if ( balance < 0 )
            borrowers.push(person);
        });

        // Who owes the most?        
        var owesMost = _.min(borrowers, function(borrower){ return borrower.balance });

        var condensed_ious = [];

        // Biggest borrower will pay all lenders
        _.each(lenders, function(lender){
          
          var iou = {
            lender: lender.id,
            borrower: owesMost.id,
            amount: lender.balance
          };

          condensed_ious.push(iou);

        });

        //Each borrower will pay biggest ower
        _.each(borrowers, function(borrower){

          if( owesMost.id == borrower.id )
            return;
          
          var iou = {
            lender: owesMost.id,
            borrower: borrower.id,
            amount: Math.abs(borrower.balance)
          };

          condensed_ious.push(iou);

        });

        return condensed_ious;

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
