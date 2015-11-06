'use strict';

describe('Controller: TopsellercatCtrl', function () {

  // load the controller's module
  beforeEach(module('ndtndtApp'));

  var TopsellercatCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TopsellercatCtrl = $controller('TopsellercatCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TopsellercatCtrl.awesomeThings.length).toBe(3);
  });
});
