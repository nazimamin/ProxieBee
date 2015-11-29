'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:TopsellercatCtrl
 * @description
 * # TopsellercatCtrl
 * Controller of the ndtndtApp
 */
angular.module('ndtndtApp')
    .controller('TopsellercatCtrl', function ($scope, ProductServices) {
        ProductServices.getTopCategories()
            .then(function (data) {
                $scope.topsellercategory = data;
            });
    });