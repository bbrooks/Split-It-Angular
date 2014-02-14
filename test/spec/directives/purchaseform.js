'use strict';

describe('Directive: purchaseForm', function () {

  // load the directive's module
  beforeEach(module('splitItApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<purchase-form></purchase-form>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the purchaseForm directive');
  }));
});
