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
    'ProductServices'
	])
    .controller('RootCtrl', ['$rootScope', '$q', '$state', RootCtrl]);

function RootCtrl($rootScope, $q, $state) {}