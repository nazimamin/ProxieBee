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
            ProductServices.PostImage(data)
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
                        $rootScope.currentUser.personimg = null;
                        $mdToast.showSimple("Posting failed. Please try again.");
                    }
                }, function () {
                    $mdToast.showSimple("Posting failed. Please try again.");
                });
        }

        ProductServices.getCategoryOptions()
            .then(function (res) {
                $scope.catOptions = res;
            }, function (err) {
                console.log(err, "@ getCategoryOptions");
            })


        function post() {
            $scope.auction.info.openedate = new Date(
                $scope.auction.info.opendate.getFullYear(),
                $scope.auction.info.openedate.getMonth(),
                $scope.auction.info.openedate.getDate(),
                $scope.auction.info.opentime.getHours(),
                $scope.auction.info.opentime.getMinutes(),
                $scope.auction.info.opentime.getSeconds()
            );
            $scope.auction.info.expiredate = new Date(
                $scope.auction.info.expiredate.getFullYear(),
                $scope.auction.info.expiredate.getMonth(),
                $scope.auction.info.expiredate.getDate(),
                $scope.auction.info.expiretime.getHours(),
                $scope.auction.info.expiretime.getMinutes(),
                $scope.auction.info.expiretime.getSeconds()
            );

            ProductServices.createAuction($scope.auction.info)
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