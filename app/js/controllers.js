'use strict';

/* Controllers */

angular.module('splitItApp.controllers', [])

  .controller('TransactionsCtrl', function( $scope, Roomates, Transactions, DebtSettler ) {
    
    // Get those services
    $scope.lenders = Roomates;
    $scope.transactions = Transactions;

    /**
     * Adds a transaction to the transaction list from the form
     */
    $scope.addTransaction = function(transactionData){

      var borrowers = _.pluck( $scope.lenders, 'name' );

      if ( transactionData.borrowers_str ){

        var realBorrowers = [];

        // Strip whitespace from borrowers string and split by comma
        var potentialBorrowers = transactionData.borrowers_str.replace(/\s+/g, '');
        potentialBorrowers = potentialBorrowers.split(',');

        // Build a list of valid borrowers included in this transaction
        _.each(potentialBorrowers, function(potentialBorrower){
          if( _.indexOf(borrowers, potentialBorrower ) > -1 )
            realBorrowers.push( potentialBorrower );
        });

        if( realBorrowers )
          borrowers = realBorrowers;
      }

      var transaction = {
        name: transactionData.name,
        amount: transactionData.amount,
        lender: transactionData.lender.name,
        borrowers: borrowers
      };

      $scope.transactions.push( transaction );
    }; // addTransaction

    // Removes a transaction
    $scope.deleteTransaction = function( transaction ){
      $scope.transactions.splice($scope.transactions.indexOf( transaction ), 1);
    }; // deleteTransaction

    /**
     * Displays the transfers required to settled the debts incurred
     * by the transactions entered
     */
    $scope.settleDebts = function(){
      $scope.settleResults = DebtSettler.transactions_to_transfers( $scope.transactions );
    }; // settleDebts

  });