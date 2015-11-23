'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:AboutCtrl
 * @description
 * # ProductsCtrl
 * Controller of the ndtndtApp
 */
angular.module('ndtndtApp')
  .controller('ProductsCtrl', function($scope) {
    this.items = geta();

    $scope.filter = {};

    $scope.getCat = function() {
      return (items || []).map(function(item) {
        return item.itemtype;
      }).filter(function(item, index, mappedArray) {
        return mappedArray.indexOf(item) === index;
      });
    };


    $scope.orderByPrice = function(item) {
      if ($scope.orderBy == 'price-high-low') {
        return -parseFloat(item.currentbid);
      }
      if ($scope.orderBy == 'price-low-high') {
        return parseFloat(item.currentbid);
      }
    };
    $scope.orderByBids = function(item) {
      if ($scope.orderBy == 'bids-high-low') {
        return -parseFloat(item.totalbids);
      }
      if ($scope.orderBy == 'bids-low-high') {
        return parseFloat(item.totalbids);
      }
    };
    $scope.orderByYear = function(item) {
      if ($scope.orderBy == 'year-high-low') {
        return -parseInt(item.yearmanufactured);
      }
      if ($scope.orderBy == 'year-low-high') {
        return parseInt(item.yearmanufactured);
      }
    };
    $scope.orderByPost = function(item) {
      if ($scope.orderBy == 'post-high-low') {
        return -item.postdate;
      }
      if ($scope.orderBy == 'post-low-high') {
        return item.postdate;
      }
    };
    $scope.orderByExp = function(item) {
      if ($scope.orderBy == 'exp-high-low') {
        return -item.expiredates;
      }
      if ($scope.orderBy == 'exp-low-high') {
        return item.expiredates;
      }
    };
  });

function geta() {
  return [{
    "auctionid": "2",
    "itemname": "Nissan Sentra",
    "openbid": "100.0000",
    "bidincrement": "10.0000",
    "currentbid": "200.00",
    "sellerid": "john",
    "itemtype": "Car",
    "yearmanufactured": "2008",
    "postdate": "2015-11-17T01:25:41.227",
    "expiredates": "2016-11-17T01:25:41.227",
    "totalbids": "30"
  }, {
    "auctionid": "3",
    "itemname": "Something",
    "openbid": "100.0000",
    "bidincrement": "10.0000",
    "currentbid": "400.00",
    "sellerid": "john",
    "itemtype": "Car",
    "yearmanufactured": "2007",
    "postdate": "2015-12-18T04:36:54.243",
    "expiredates": "2017-11-17T01:25:41.227",
    "totalbids": "20"
  }, {
    "auctionid": "3",
    "itemname": "Something",
    "openbid": "100.0000",
    "bidincrement": "10.0000",
    "currentbid": "350.00",
    "sellerid": "john",
    "itemtype": "Car",
    "yearmanufactured": "2007",
    "postdate": "2015-12-18T04:36:54.243",
    "expiredates": "2017-11-17T01:25:41.227",
    "totalbids": "15"
  }]
}
