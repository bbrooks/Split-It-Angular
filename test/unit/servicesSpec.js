'use strict';

/* jasmine specs for services go here */

describe('service', function() {
	beforeEach(module('splitItApp.services'));

	describe( 'DebtSettler', function(){

		describe('DebtSettler.transaction_to_ious', function() {

			var amount = 100,
				lender = 'Joe',
				borrowers = ['Randal', 'Sue', 'Tom'];


			it('Breaks a transaction into and IOU for each borrower', inject(function( DebtSettler ) {
				var IOUs = DebtSettler.transaction_to_ious( amount, lender, borrowers );
				expect( IOUs.length ).toEqual( borrowers.length );
			}));

			it('Divides the amount evenly amoung all the people in the transaction', inject(function( DebtSettler ) {
				var IOUs = DebtSettler.transaction_to_ious( amount, lender, borrowers );
				_.each( IOUs, function( IOU ){
					expect( Math.abs(IOU.amount) ).toEqual( amount/(borrowers.length + 1));
				});
			}));

		});

		describe( 'DebtSettler.transactions_to_transfers', function(){
			it( 'Should provide a list of transfers that add up to the total amount of money that needs to change hands.', inject(function( DebtSettler ){
				var transactions1 = [
					{
						amount: 345,
						lender: 'Joey',
						borrowers: ['Sam','Tom', 'Rosy']
					},
					{
						amount: 864,
						lender: 'Tom',
						borrowers: ['Sam','Rosy']
					},
					{
						amount: 91,
						lender: 'Joey',
						borrowers: ['Tom','Rosy']
					}
				];

				var totalToChangeHands = 0;

				_.each( transactions1, function( transaction ){
					totalToChangeHands += transaction.borrowers.length * (transaction.amount/(transaction.borrowers.length + 1));
				});

				var transfers = DebtSettler.transactions_to_transfers( transactions1 );

				var totalChangingHands = 0;

				_.each( transfers, function( transfer ){
					totalChangingHands += transfer.amount;
				});

				expect( totalToChangeHands ).toBe( totalChangingHands );
			}));
		});
	});
});
