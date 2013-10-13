'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Split It', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  it('should be able to add a transaction', function(){

    // Remove all initial transactions
    // @Todo: figure out how to access scope and do this better
    element('.transaction a[ng-click="deleteTransaction(t)"]').click();

    // Add a transaction
    select('newTransaction.lender').option(1);
    input('newTransaction.name').enter('A really unlikely purchase');
    input('newTransaction.amount').enter(324);
    element('#add-transaction-form button[type="submit"]').click();

    var transaction_count = repeater('#transactions .transaction').count();


    expect( transaction_count ).toEqual( 1 );


  });


});
