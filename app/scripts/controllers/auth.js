'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the ndtndtApp
 */
angular.module('ndtndtApp')
    .controller('AuthCtrl', function ($scope, $mdDialog) {
        $scope.showLoginSignupDialog = function (ev) {
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'views/auth.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };
    });

function DialogController($scope, $mdDialog) {
    $scope.close = function () {
        $mdDialog.hide();
    };
}