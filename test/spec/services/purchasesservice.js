'use strict';

describe('Service: purchasesService', function () {

  // load the service's module
  beforeEach(module('splitItApp'));

  // instantiate service
  var purchasesService;
  beforeEach(inject(function (_purchasesService_) {
    purchasesService = _purchasesService_;
  }));

  it('should do something', function () {
    expect(!!purchasesService).toBe(true);
  });

});
