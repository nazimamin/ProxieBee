'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:AboutCtrl
 * @description
 * # ProductsCtrl
 * Controller of the ndtndtApp
 */
angular.module('ndtndtApp')
    .controller('BigAdminCtrl', function ($scope, UserServices, $rootScope, $mdDialog, $mdToast, $stateParams) {
        $scope.profile = this;
        $scope.profile = $rootScope.currentUser.restinfo;
        $scope.profile.userpassword = "";
        $scope.PostImage = function (data, errFiles) {
            $scope.f = data;
        }


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