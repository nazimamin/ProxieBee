'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:AboutCtrl
 * @description
 * # ProductsCtrl
 * Controller of the ndtndtApp
 */
angular.module('ndtndtApp')
    .controller('ProductsCtrl', function ($scope, ProductServices, $rootScope, $mdDialog, $mdToast) {
        ProductServices.getAllProducts()
            .then(function (data) {
                if (data.length > 0) {
                    //$scope.items = data;
                    $rootScope.items = data;
                    //holds avilable filter categories
                    $scope.filter = {};
                    //ng-model to hold the text entered in the input box
                    $scope.searchText = '';
                    //returns the unique categories
                    $scope.getCat = function () {
                        return ($rootScope.items).map(function (item) {
                            return item.itemtype.toUpperCase();
                        }).filter(function (item, index, mappedArray) {
                            return mappedArray.indexOf(item) === index;
                        });
                    };
                    //filters the item based on category selected
                    $scope.filterByCategory = function (item) {
                        return $scope.filter[item.itemtype.toUpperCase()] || isPresent($scope.filter);
                    };

                    // all the avilable sorts
                    $scope.orderByPrice = function (item) {
                        if ($scope.orderBy == 'price-high-low') {
                            return -parseFloat(item.currentbid);
                        }
                        if ($scope.orderBy == 'price-low-high') {
                            return parseFloat(item.currentbid);
                        }
                    };
                    $scope.orderByBids = function (item) {
                        if ($scope.orderBy == 'bids-high-low') {
                            return -parseInt(item.totalbidders);
                        }
                        if ($scope.orderBy == 'bids-low-high') {
                            return parseInt(item.totalbidders);
                        }
                    };
                    $scope.orderByYear = function (item) {
                        if ($scope.orderBy == 'year-high-low') {
                            return -parseInt(item.yearmanufactured);
                        }
                        if ($scope.orderBy == 'year-low-high') {
                            return parseInt(item.yearmanufactured);
                        }
                    };
                    $scope.orderByPost = function (item) {
                        if ($scope.orderBy == 'post-high-low') {
                            return -item.postdate;
                        }
                        if ($scope.orderBy == 'post-low-high') {
                            return item.postdate;
                        }
                    };
                    $scope.orderByExp = function (item) {
                        if ($scope.orderBy == 'exp-high-low') {
                            return -item.expiredates;
                        }
                        if ($scope.orderBy == 'exp-low-high') {
                            return item.expiredates;
                        }
                    };
                }
            });

        //shows the modal to login/signup
        $scope.showBidDialog = function (ev) {
            $mdDialog.show({
                controller: BidController,
                templateUrl: 'views/bid.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }
    });

function BidController($scope, $mdDialog) {
    $scope.close = function () {
        $mdDialog.hide();
    };
}

function isPresent(filter) {
    for (var value in filter) {
        if (filter[value]) {
            return false;
        }
    }
    return true;
}