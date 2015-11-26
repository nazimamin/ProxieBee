'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ndtndtApp
 */
angular.module('ndtndtApp')
    .controller('MainCtrl', function () {

    }).config(function ($mdThemingProvider) {
        $mdThemingProvider.definePalette('ndtndt', {
            "50": "#ffffff",
            "100": "#ffffff",
            "200": "#fbfcfd",
            "300": "#cacfe8",
            "400": "#b4bbde",
            "500": "#9fa8d5",
            "600": "#8a95cc",
            "700": "#7481c2",
            "800": "#5f6eb9",
            "900": "#4c5cae",
            "A100": "#ffffff",
            "A200": "#ffffff",
            "A400": "#b4bbde",
            "A700": "#7481c2"
        });
        $mdThemingProvider.theme('ndtndt')
            .primaryPalette('ndtndt');
        $mdThemingProvider.setDefaultTheme('ndtndt');
    });