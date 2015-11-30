'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:AboutCtrl
 * @description
 * # ProductsCtrl
 * Controller of the ndtndtApp
 */
angular.module('ndtndtApp')
    .controller('ProductCtrl', function ($scope, ProductServices, $rootScope, $mdDialog, $mdToast, $stateParams) {
        $scope.auctionId = $stateParams.auctionId;
        ProductServices.getProduct($stateParams.auctionId)
            .then(function (data) {
                $scope.auction = data;
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