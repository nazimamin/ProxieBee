'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:AboutCtrl
 * @description
 * # ProductsCtrl
 * Controller of the ndtndtApp
 */
angular.module('ndtndtApp')
    .controller('ProductCtrl', function ($scope, ProductServices, $rootScope, $mdDialog, $mdToast, $stateParams, shareData) {
        $scope.auctionId = $stateParams.auctionId;
        $scope.auction = null;

        $scope.product = this;
        $scope.product.post = post;

        function post() {
            $scope.PostData = this;
            $scope.PostData.auctionid = $scope.auctionId;
            $scope.PostData.customerid = $rootScope.currentUser.id;
            $scope.PostData.bidprice = $scope.product.bidprice;
            ProductServices.placeBid($scope.PostData)
                .then(function (data) {
                    if (data) {
                        $mdToast.showSimple("Bidding Successfull!");
                        ProductServices.getAuctionHistory($stateParams.auctionId)
                            .then(function (adata) {
                                $scope.auctionhistory = adata;
                            });
                        ProductServices.getProduct($stateParams.auctionId)
                            .then(function (data) {
                                $scope.auction = data;

                            });
                    } else {
                        $mdToast.showSimple("Bidding failes. Please try again.");
                    }
                }, function () {
                    $mdToast.showSimple("Bidding failed. Please try again.");
                });
        }


        $scope.productpromise = ProductServices.getProduct($stateParams.auctionId)
            .then(function (data) {
                $scope.auction = data;

            });
        $scope.auctionhistorypromise = ProductServices.getAuctionHistory($stateParams.auctionId)
            .then(function (data) {
                $scope.auctionhistory = data;

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