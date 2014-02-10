'use strict';

describe('Controller: PurchasesCtrl', function () {

  // load the controller's module
  beforeEach(module('splitItApp'));

  var PurchasesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PurchasesCtrl = $controller('PurchasesCtrl', {
      $scope: scope
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(scope.awesomeThings.length).toBe(3);
  // });
});
