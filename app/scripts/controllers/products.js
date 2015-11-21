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
    this.items = colorTiles($scope.auctions);
  });

function colorTiles() {
  var auctions = geta();
  var tiles = [];
  for (var i = 0; i <auctions.length; i++) {
    tiles.push({
      title: auctions[i].itemname,
      icon: '../images/bike.png',
      color: 'red',
      colspan: getSize(i).col,
      rowspan: getSize(i).row
    });
  }
  return tiles;
}

function getSize(i) {
  if (((i + 1) % 10) == 1 || ((i + 1) % 10) == 5) {
    if (i != 10) {
      return {
        'col': 2,
        'row': 2
      }
    }else{
      return {
        'col': 1,
        'row': 1
      }
    }
  } else if (((i + 1) % 10) == 4) {
    return {
      'col': 2,
      'row': 1
    }
  } if(i!=0 && i%11==0) {
    return {
      'col': 1,
      'row': 1
    }
  }else{
    return {
      'col': 1,
      'row': 1
    }
  }
}

function geta (){
  return [{
        "auctionid": "2",
        "itemname": "Nissan Sentra",
        "openbid": "1000.0000",
        "bidincrement": "10.0000",
        "currentbid": "2.0000",
        "sellerid": "john",
        "itemtype": "Car",
        "yearmanufactured": "2007",
        "postdate": "2015-11-17T01:25:41.227",
        "expiredates": "2008-12-16T13:00:00"
      }, {
        "auctionid": "3",
        "itemname": "Nissan Sentra",
        "openbid": "100.0000",
        "bidincrement": "10.0000",
        "currentbid": "20.0000",
        "sellerid": "john",
        "itemtype": "Car",
        "yearmanufactured": "2007",
        "postdate": "2015-11-18T04:36:54.243",
        "expiredates": "2011-12-16T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }, {
        "auctionid": "1",
        "itemname": "Titanic",
        "openbid": "15.0000",
        "bidincrement": "1.0000",
        "currentbid": "500.0000",
        "sellerid": "phil",
        "itemtype": "DVD",
        "yearmanufactured": "2005",
        "postdate": "2015-11-17T01:25:41.220",
        "expiredates": "2012-12-12T13:00:00"
      }]
}
