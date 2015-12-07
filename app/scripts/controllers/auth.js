'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the ndtndtApp
 */
angular.module('ndtndtApp')
    .controller('AuthCtrl', function ($scope, $state, $mdDialog, $mdToast, UserServices, $rootScope, $window) {
        $scope.user = this;
        $scope.user.login = {};
        $scope.user.signup = {};
        // bind the functions to our controller
        $scope.user.signupF = signupF;
        $scope.user.loginF = loginF;
        $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
            'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
            'WY').split(' ').map(function (state) {
            return {
                abbrev: state
            };
        });
        $scope.PostImage = function (data, errFiles) {
            $scope.f = data;
            /* UserServices.PostImage(data)
                 .then(function (data) {
                     if (data) {
                         /*$rootScope.currentUser.id = data.customerid;
                         $rootScope.currentUser.role = data.role;
                         $rootScope.currentUser.personimg = data.personimg;
                         $rootScope.currentUser.restinfo = data;
                         
                         ////console.log(data);
                         // $scope.close();
                     } else {
                         $rootScope.currentUser.personimg = null;
                         $mdToast.showSimple("Posting failed. Please try again.");
                     }
                 }, function () {
                     $mdToast.showSimple("Posting failed. Please try again.");
                 });*/
        }

        function signupF() {
            UserServices.signup($scope.user.signup, $scope.f)
                .then(function (data) {
                    if (data) {
                        /*$rootScope.currentUser.id = data.customerid;
                        $rootScope.currentUser.role = data.role;
                        $rootScope.currentUser.personimg = data.personimg;
                        $rootScope.currentUser.restinfo = data;
                        */
                        $scope.close();
                        $mdToast.showSimple("Signup Successful!. Please login to access your account.");
                        $state.go('mainpage');
                    } else {
                        $rootScope.currentUser = {};
                        $mdToast.showSimple("Signup failed. Please try again.");
                    }
                }, function () {
                    $rootScope.currentUser = {};
                    $mdToast.showSimple("Signup failed. Please try again.");
                });
        }


        function loginF() {
            UserServices.login($scope.user.login)
                .then(function (data) {
                    ////console.log(data);
                    if (data.customerid) {
                        $rootScope.currentUser.id = data.customerid;
                        $rootScope.currentUser.personimg = data.personimg;
                        $rootScope.currentUser.admin = data.maglevel;
                        $rootScope.currentUser.restinfo = data;
                        $window.sessionStorage.setItem('currentUser', JSON.stringify(data));
                        $scope.close();
                        if ($rootScope.currentUser.admin == '1') {
                            $state.go('littleadmin');
                        } else if ($rootScope.currentUser.admin == '0') {
                            $state.go('bigadmin')
                        }
                    } else {
                        $rootScope.currentUser = {};
                        $mdToast.showSimple("Login failed. Please try again.");
                    }
                }, function () {
                    $rootScope.currentUser = {};
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