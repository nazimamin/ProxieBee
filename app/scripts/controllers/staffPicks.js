'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:StaffPicks
 * @description
 * # StaffPicks
 * Controller of the ndtndtApp
 */
angular.module('ndtndtApp')
    .controller('StaffPicksCtrl', ['$scope', 'ProductServices', function ($scope, ProductServices) {
        $scope.staffpickspromise = ProductServices.staffpicks()
            .then(function (data) {
                if (data) {
                    if (data.length == 1 && data[0][0]) {
                        $scope.staffPicksItems = data[0];
                    } else {
                        $scope.staffPicksItems = data;
                    }
                }

            });
    }]);