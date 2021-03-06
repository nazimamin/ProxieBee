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
    'ng-currency',
    'ProductServices',
    'UserServices',
    'angularInlineEdit',
    'cgBusy'
	])
    .controller('RootCtrl', ['$rootScope', '$q', '$state', 'UserServices', '$window', '$scope', RootCtrl]);

function RootCtrl($rootScope, $q, $state, UserServices, $window, $scope) {
    var root = this;
    //bind the function to the controller
    root.logout = logout;

    //will hold the info about a user i.e id / picture
    $rootScope.currentUser = {};
    $rootScope.currentUser = UserServices.isLoggedIn();

    //will logout a user
    function logout() {
        $window.sessionStorage.removeItem('currentUser');
        UserServices.isLoggedIn();
        $rootScope.currentUser = {};
        $state.go('mainpage');
    }
}