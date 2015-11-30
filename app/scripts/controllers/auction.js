'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the desktopApp
 */
angular.module('ndtndtApp')
    .controller('AuctionCtrl', function ($scope, $rootScope, ProductServices, $q, $mdDialog, $mdToast) {
        $scope.seller = $rootScope.currentUser.restinfo;

        $scope.auction = this;
        $scope.auction.info = {};
        $scope.auction.post = post;

        var aDay = new Date();
        $scope.minDate = new Date();
        $scope.maxDate = new Date(
            aDay.getFullYear(),
            aDay.getMonth(),
            aDay.getDate() + 30);

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
                "itemtype": "PETS"
  },
            {
                "itemtype": "Furniture"
 }, {
                "itemtype": "House"
 }];


        function post() {
            $scope.auction.info.postdate = new Date(
                $scope.auction.info.postdate.getFullYear(),
                $scope.auction.info.postdate.getMonth(),
                $scope.auction.info.postdate.getDate(),
                $scope.auction.info.posttime.getHours(),
                $scope.auction.info.posttime.getMinutes(),
                $scope.auction.info.posttime.getSeconds()
            );
            $scope.auction.info.expiredates = new Date(
                $scope.auction.info.expiredates.getFullYear(),
                $scope.auction.info.expiredates.getMonth(),
                $scope.auction.info.expiredates.getDate(),
                $scope.auction.info.expiretime.getHours(),
                $scope.auction.info.expiretime.getMinutes(),
                $scope.auction.info.expiretime.getSeconds()
            );

            $scope.auction.info.sellerid = $rootScope.currentUser.id;
            ProductServices.createAuction($scope.auction.info, $scope.f)
                .then(function (data) {
                    if (data) {
                        /*$rootScope.currentUser.id = data.customerid;
                        $rootScope.currentUser.role = data.role;
                        $rootScope.currentUser.personimg = data.personimg;
                        $rootScope.currentUser.restinfo = data;
                        */
                        console.log(data);
                        // $scope.close();
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