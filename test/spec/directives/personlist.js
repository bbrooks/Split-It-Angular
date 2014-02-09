'use strict';

describe('Directive: personList', function () {

  // load the directive's module
  beforeEach(module('splitItApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<person-list></person-list>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the personList directive');
  }));
});
