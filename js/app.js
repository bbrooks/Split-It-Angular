/**
 * Split It
 *
 * Records purchases that need to be shared by
 * different memebers of a group and calculates the easiest
 * way everyone to pay eachother back.
 *
 * @todo: unit tests
 * @todo: break services and providers out into separate files
 * @todo: client-side form validation
 * @todo: hook up to a database
 */

var app = angular.module('splitItApp', []);

// Returns an array of roomate objects
app.factory('Roomates', function(){
	//@todo: get from storage;
	return [
		{ id: 1, name: 'Tom'},
		{ id: 2, name: 'Joey'},
		{ id: 3, name: 'Rosy'},
		{ id: 4, name: 'Sam'}
	];
});

// Return an array of transaction objects
app.factory('Transactions', function(){
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
});

// Does the fancy math requires to reduce a set of group purchases 
// into a small set of requires transfers between two people.
app.factory('DebtSettler', function(){

	var debtSettler = {

		/**
		 * Takes an array of transactions and scrunches them
		 * down to the smallest number of transfers between
		 * two people required to settle all the debts
		 * 
		 * @param  array transactions An array of transactions ex.
		 * { name: 'Spaceship', amount: 9000000, lender: 'Rosy', borrowers: ['Sam','Tom'] }
		 *
		 * @return array All the transfers between two people that must occur to settle
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
			amount = amount - share;
			share = amount / borrowers.length;

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


app.controller('splitItCtrl', function( $scope, Roomates, Transactions, DebtSettler ){

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
			potentialBorrowers = transactionData.borrowers_str.replace(/\s+/g, '');
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
	};

	$scope.deleteTransaction = function( transaction ){
		$scope.transactions.splice($scope.transactions.indexOf( transaction ), 1);
	};

	/**
	 * Displays the transfers required to settled the debts incurred
	 * by the transactions entered
	 */
	$scope.settleDebts = function(){
		$scope.settleResults = DebtSettler.transactions_to_transfers( $scope.transactions );
	};

});