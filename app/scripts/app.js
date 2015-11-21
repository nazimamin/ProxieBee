'use strict';

/**
 * @ngdoc overview
 * @name ndtndtApp
 * @description
 * # ndtndtApp
 *
 * Main module of the application.
 */
angular
    .module('ndtndtApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'slick',
    'ngMaterial',
    'mb-adaptive-backgrounds'
  ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/products', {
                templateUrl: 'views/products.html',
                controller: 'ProductsCtrl',
                controllerAs: 'products'
            })
            .otherwise({
                redirectTo: '/'
            });
        // $locationProvider.html5Mode(true);
    });
