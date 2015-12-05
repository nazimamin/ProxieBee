'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the desktopApp
 */
angular.module('ndtndtApp')
    .controller('AuctionCtrl', function ($scope, $rootScope, ProductServices, $q, $mdDialog, $mdToast, $state) {
        $scope.seller = $rootScope.currentUser.restinfo;

        $scope.auction = this;
        $scope.auction.info = {};
        $scope.auction.post = post;
        var aDay = new Date();
        $scope.minDate = new Date(
            aDay.getFullYear(),
            aDay.getMonth(),
            aDay.getDate()
        );
        $scope.maxDate = new Date(
            aDay.getFullYear(),
            aDay.getMonth(),
            aDay.getDate() + 30);
        console.log($scope.minDate);
        $scope.PostImage = function (data, errFiles) {
            $scope.f = data;
            /*  ProductServices.PostImage(data)
                .then(function (data) {
                    if (data) {
                        /*$rootScope.currentUser.id = data.customerid;
                        $rootScope.currentUser.role = data.role;
                        $rootScope.currentUser.personimg = data.personimg;
                        $rootScope.currentUser.restinfo = data;
                        
                        console.log(data);
                        // $scope.close();
                    } else {
                        $rootScope.currentUser.personimg = null;
                        $mdToast.showSimple("Posting failed. Please try again.");
                    }
                }, function () {
                    $mdToast.showSimple("Posting failed. Please try again.");
                });
*/
        }
        $scope.catOptions = [{
                "itemtype": "DVD"

  }, {
                "itemtype": "CAR"
  }, {
                "itemtype": "Book"
  },
            {
                "itemtype": "BABY"
 }, {
                "itemtype": "TOYS"
 }, {
                "itemtype": "CLOTHING"
 }, {
                "itemtype": "JEWELRY"
 }, {
                "itemtype": "ELECTRONICS"
 }, {
                "itemtype": "SILVERWARE"
 }, {
                "itemtype": "SPORT MEMORABILA"
 },
            {
                "itemtype": "CLEANING PRODUCTS"
 }];
        ProductServices.getMonitors()
            .then(function (data) {
                if (data.length > 0) {
                    $scope.monitors = data;
                }
            });

        function post() {
            if (!$scope.auction.info.reservePrice) {
                $scope.auction.info.reservePrice = 0;
            }
            $scope.auction.info.postdate = new Date(
                $scope.auction.info.postdate.getFullYear(),
                $scope.auction.info.postdate.getMonth(),
                $scope.auction.info.postdate.getDate(),
                $scope.auction.info.posttime.getHours(),
                $scope.auction.info.posttime.getMinutes(),
                $scope.auction.info.posttime.getSeconds()
            );
            $scope.auction.info.expiredate = new Date(
                $scope.auction.info.expiredate.getFullYear(),
                $scope.auction.info.expiredate.getMonth(),
                $scope.auction.info.expiredate.getDate(),
                $scope.auction.info.expiretime.getHours(),
                $scope.auction.info.expiretime.getMinutes(),
                $scope.auction.info.expiretime.getSeconds()
            );

            $scope.auction.info.sellerid = $rootScope.currentUser.id;
            ProductServices.createAuction($scope.auction.info, $scope.f)
                .then(function (data) {
                    if (data) {
                        $mdToast.showSimple("Posting Auction Successfull!");
                        ProductServices.getAllProducts()
                            .then(function (data) {
                                $rootScope.items = data;
                                $state.go('products');
                            });

                        $scope.close();
                    } else {
                        $rootScope.currentUser = {};
                        $mdToast.showSimple("Posting failed. Please try again.");
                    }
                }, function () {
                    $mdToast.showSimple("Posting failed. Please try again.");
                });
        }


        $scope.showAuctionDialog = function (ev) {
            $mdDialog.show({
                controller: AutcionDialogController,
                templateUrl: 'views/auction.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }
    });

function AutcionDialogController($scope, $mdDialog, $rootScope) {
    $scope.close = function () {
        $mdDialog.hide();
    };
}