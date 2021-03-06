'use strict';

describe('Service: debtSettler', function () {

  // load the service's module
  beforeEach(module('splitItApp'));

  // instantiate service
  var debtSettler, mockPurchases, transfers;
  beforeEach(inject(function (_debtSettler_) {
    debtSettler = _debtSettler_;

    // Mock up some purchases:
    mockPurchases = [
      {
          "uuid": 1,
          "description": "Milk, eggs, spam",
          "purchaser": "1",
          "cost": 60,
          "splitBetween": ["1","2"],
          "purchaseDate": "2008-06-05"
      },
      {
          "uuid": 2,
          "description": "Yogurt, bananas",
          "purchaser": "1",
          "cost": 99,
          "splitBetween": ["1","2","3"],
          "purchaseDate": "2008-11-07"
      },
      {
          "uuid": 3,
          "description": "science, for real",
          "purchaser": "2",
          "cost": 12,
          "splitBetween": ["2","3"],
          "purchaseDate": "1990-11-27"
      },
      {
          "uuid": 4,
          "description": "purposes of demonstration only :)",
          "purchaser": "3",
          "cost": 40,
          "splitBetween": ["1","3"],
          "purchaseDate": "1990-11-27"
      }
    ];

    transfers = debtSettler.purchases_to_transfers(mockPurchases);

  }));

  it('Person 2 should owe Person 1 $76', function(){
    var transfer = _.findWhere(transfers, { borrower: "2" });
    expect(transfer.lender).toBe("1");
    expect(transfer.borrower).toBe("2");
    expect(transfer.amount).toBe(76);
  });


  it('Person 3 should owe Person 2 $19', function(){
    var transfer = _.findWhere(transfers, { borrower: "3" });
    expect(transfer.lender).toBe("2");
    expect(transfer.borrower).toBe("3");
    expect(transfer.amount).toBe(19); 
  });

});
