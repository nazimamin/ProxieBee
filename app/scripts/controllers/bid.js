'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:AboutCtrl
 * @description
 * # ProductsCtrl
 * Controller of the ndtndtApp
 */
angular.module('ndtndtApp')
    .controller('BidCtrl', function ($scope, ProductServices, $rootScope, $mdDialog, $mdToast, shareData) {
        // data will passed from dialogController
        // using service to set and get data between controllers
        $scope.auction = shareData.getAuctionData();

        $scope.auction.post = post;

        function post() {
            $scope.PostData = this;
            $scope.PostData.auctionid = $scope.auction.auctionid;
            $scope.PostData.customerid = $rootScope.currentUser.id;
            $scope.PostData.bidprice = $scope.auction.bidprice;
            ProductServices.placeBid($scope.PostData)
                .then(function (data) {
                    ////console.log(data);
                    if (data) {
                        ProductServices.getAllProducts()
                            .then(function (data) {
                                $rootScope.items = data;
                            });
                        $mdToast.showSimple("Bidding Successfull!");

                        $scope.close();

                    } else {
                        $mdToast.showSimple("Bidding failes. Please try again.");
                    }
                }, function () {
                    $mdToast.showSimple("Bidding failed. Please try again.");
                });
        }



        //shows the modal to login/signup
        $scope.showBidDialog = function (ev, data) {
            $mdDialog.show({
                locals: {
                    auctionDataFromProductsCtrl: data
                },
                controller: BidDialogController,
                templateUrl: 'views/bid.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }
    });

function BidDialogController($scope, $mdDialog, shareData, auctionDataFromProductsCtrl) {
    auctionDataFromProductsCtrl.currentbid = parseFloat(auctionDataFromProductsCtrl.currentbid).toFixed(2);
    auctionDataFromProductsCtrl.bidincrement = parseFloat(auctionDataFromProductsCtrl.bidincrement).toFixed(2);
    shareData.setAuctionData(auctionDataFromProductsCtrl);
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