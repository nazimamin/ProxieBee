'use strict';

/**
 * @ngdoc overview
 * @name ndtndtApp
 * @description
 * # ndtndtApp
 *
 * routes of the application
 */
angular
    .module('app.routes', [])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', AppRoutes]);

function AppRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('mainpage', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl as main'
        })
        .state('auth', {
            url: '/auth',
            templateUrl: 'views/auth.html',
            controller: 'AuthCtrl as auth'
        })
        .state('product', {
            url: '/product/{auctionid}',
            templateUrl: 'views/product.html',
            controller: 'ProductCtrl as product'
        })
        .state('products', {
            url: '/products',
            templateUrl: 'views/products.html',
            controller: 'ProductsCtrl as products'
        })
        .state('profile', {
            url: '/profile/{customerid}',
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl as profile'
        })
        //when a customer bids, open as a dialog
        .state('bid', {
            url: '/bid/{id}',
            templateUrl: 'views/bid.html',
            controller: 'BidCtrl as bid'
        })
        .state('admin', {
            url: '/admin',
            templateUrl: 'views/admin.html',
            controller: 'AdminCtrl as admin'
        });

    $urlRouterProvider.otherwise('/');
    //$locationProvider.html5Mode(true);
}