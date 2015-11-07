'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:TopsellercatCtrl
 * @description
 * # TopsellercatCtrl
 * Controller of the ndtndtApp
 */
angular.module('ndtndtApp')
    .controller('TopsellercatCtrl', function ($scope) {
        $scope.topsellercategory = [{
                "title": "Laptops",
                "url": "http://ndtndt.com/url",
                "image": "../images/bike.png"
}, {
                "title": "Kitchen",
                "url": "http://ndtndt.com/url",
                "image": "../images/bike.png"
},
            {
                "title": "Toys",
                "url": "http://ndtndt.com/url",
                "image": "../images/bike.png"
                                   },
            {
                "title": "Clothing",
                "url": "http://ndtndt.com/url",
                "image": "../images/bike.png"
                                   }, {
                "title": "Shoes",
                "url": "http://ndtndt.com/url",
                "image": "../images/bike.png"
                                   }, {
                "title": "Cars",
                "url": "http://ndtndt.com/url",
                "image": "../images/bike.png"
                                   }];
    });