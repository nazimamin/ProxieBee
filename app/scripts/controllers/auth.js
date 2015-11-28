'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the ndtndtApp
 */
angular.module('ndtndtApp')
    .controller('AuthCtrl', function ($scope, $state, $mdDialog, $mdToast, UserServices, $rootScope) {
        $scope.user = this;
        $scope.user.login = {};
        $scope.user.signup = {};
        // bind the functions to our controller
        $scope.user.signupF = signupF;
        $scope.user.loginF = loginF;

        function signupF() {
            UserServices.signup($scope.user.signup)
                .then(function (data) {
                    if (data) {
                        /*$rootScope.currentUser.id = data.customerid;
                        $rootScope.currentUser.role = data.role;
                        $rootScope.currentUser.personimg = data.personimg;
                        $rootScope.currentUser.restinfo = data;
                        */
                        console.log(data);
                        $scope.close();
                        $state.go('mainpage');
                    } else {
                        $rootScope.currentUser = {};
                        $mdToast.showSimple("Signup failed. Please try again.");
                    }
                }, function () {
                    $mdToast.showSimple("Signup failed. Please try again.");
                });
        }


        function loginF() {
            UserServices.login($scope.user.login)
                .then(function (data) {
                    console.log(data.customerid);
                    if (data.customerid) {
                        $rootScope.currentUser.id = data.customerid;
                        $rootScope.currentUser.role = data.role;
                        $rootScope.currentUser.personimg = data.personimg;
                        $rootScope.currentUser.restinfo = data;
                        $scope.close();
                        $state.go('mainpage');
                    } else {
                        $rootScope.currentUser = {};
                        $mdToast.showSimple("Login failed. Please try again.");
                    }
                }, function () {
                    $mdToast.showSimple("Login failed. Please try again.");
                });
        }

        //shows the modal to login/signup
        $scope.showLoginSignupDialog = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/auth.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }
    });

function DialogController($scope, $mdDialog) {
    $scope.close = function () {
        $mdDialog.hide();
    };
}