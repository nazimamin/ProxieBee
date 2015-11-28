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
	'ui.router',
    'app.routes',
	'ngFileUpload',
	'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'slick',
    'ngMaterial',
    'mb-adaptive-backgrounds',
    'ng-currency',
    'ProductServices',
    'UserServices'
	])
    .controller('RootCtrl', ['$rootScope', '$q', '$state', 'UserServices', RootCtrl]);

function RootCtrl($rootScope, $q, $state, UserServices) {
    var root = this;

    //bind the function to the controller
    root.isLoggedIn = isLoggedIn;
    root.logout = logout;

    //will hold the info about a user i.e id / picture
    $rootScope.currentUser = {};

    //will return if a user is logged in
    function isLoggedIn() {
        if ($rootScope.currentUser.id !== null) {
            return true;
        }
        return false;
    }
    //will logout a user
    function logout() {
        return $rootScope.currentUser = {};
    }


}