'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the desktopApp
 */
angular.module('ndtndtApp')
    .controller('ProfileCtrl', function ($scope, $rootScope, UserServices, $mdToast, $state, $window, ProductServices) {
        $scope.profile = this;
        $scope.profile = $rootScope.currentUser.restinfo;
        $scope.profile.userpassword = "";
        $scope.PostImage = function (data, errFiles) {
            $scope.f = data;
        }

        $scope.profile.post = post;
        $scope.profile.deleteProfile = deleteProfile;

        function post() {
            if ($scope.profile.userpassword.length <= 0) {
                $mdToast.showSimple("You must re-enter password to update your profile.");
            } else {
                $rootScope.currentUser.restinfo = $scope.profile.restinfo;
                $scope.profile.restinfo = null;
                $scope.profile.ssn = $scope.profile.customerid;
                UserServices.UpdateProfile($scope.profile, $scope.f)
                    .then(function (data) {
                        if (data) {
                            $rootScope.currentUser.id = $scope.profile.customerid;
                            $rootScope.currentUser.personimg = $scope.profile.personimg;
                            $rootScope.currentUser.admin = $scope.profile.maglevel;

                            //$window.sessionStorage.removeItem('currentUser');
                            $window.sessionStorage.setItem('currentUser', JSON.stringify($scope.profile));
                            $mdToast.showSimple("Profile updated successfully!");
                        } else {
                            $mdToast.showSimple("Profile Update failed. Please refresh and try again.");
                        }
                    }, function () {
                        $mdToast.showSimple("Profile Update failed. Please refresh and try again.");
                    });
            }

        }

        function deleteProfile() {
            if ($scope.profile.userpassword.length <= 0) {
                $mdToast.showSimple("You must re-enter password to update your profile.");
            } else {
                if ($scope.profile.creditcardnum) {

                } else {
                    $scope.profile.creditcardnum = "p";
                }
                $scope.profile.restinfo = null;
                $scope.profile.ssn = $scope.profile.customerid;
                UserServices.DeleteProfile($scope.profile)
                    .then(function (data) {
                        if (data.status == 'success') {
                            //console.log(data.status);
                            $rootScope.currentUser = {};
                            $window.sessionStorage.removeItem('currentUser');
                            $mdToast.showSimple("Account Deleted Successfully!");
                            $state.go('mainpage');

                        } else {
                            $mdToast.showSimple("Account Deletion failed!" + data.status);
                        }
                    }, function () {
                        $mdToast.showSimple("Account Deletion failed!");
                    });
            }

        }
        /*   ProductServices.postuserpicks($rootScope.currentUser.id)
            .then(function (data) {
                ProductServices.getuserpicks($rootScope.currentUser.id)
                    .then(function (data) {
                        $scope.itemSuggestions = data;
                        console.log(data);
                    });
            });

*/
        $scope.profileprofmie = UserServices.getCustomerBidHistory($scope.currentUser.id)
            .then(function (data) {
                if (data) {
                    $scope.bidhistory = data;
                }
            });

        $scope.profilepromise = UserServices.getCustomerSellHistory($scope.currentUser.id)
            .then(function (data) {
                if (data) {
                    $scope.sellhistory = data;
                }
            });


    });