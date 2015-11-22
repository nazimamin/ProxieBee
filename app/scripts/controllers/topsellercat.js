'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:TopsellercatCtrl
 * @description
 * # TopsellercatCtrl
 * Controller of the ndtndtApp
 */
angular.module('ndtndtApp')
  .controller('TopsellercatCtrl', function($scope) {
    $scope.topsellercategory = [{
      "title": "Electronics",
      "url": "http://ndtndt.com/url",
      "items": "200"
    }, {
      "title": "Jewelry",
      "url": "http://ndtndt.com/url",
    "items": "200"
    }, {
      "title": "Toys",
      "url": "http://ndtndt.com/url",
      "items": "200"
    }, {
      "title": "Clothings",
      "url": "http://ndtndt.com/url",
      "items": "200"
    }, {
      "title": "Shoes",
      "url": "http://ndtndt.com/url",
    "items": "200"
    }, {
      "title": "Cars",
      "url": "http://ndtndt.com/url",
      "items": "200"
    }];
  });
