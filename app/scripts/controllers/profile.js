'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the desktopApp
 */
angular.module('ndtndtApp')
    .controller('ProfileCtrl', function ($scope, $rootScope, UserServices, $mdToast, $state) {
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
                if ($scope.profile.creditcardnum) {

                } else {
                    $scope.profile.creditcardnum = "p";
                }

                $scope.profile.restinfo = null;
                $scope.profile.ssn = $scope.profile.customerid;
                UserServices.UpdateProfile($scope.profile, $scope.f)
                    .then(function (data) {
                        if (data) {
                            $rootScope.currentUser = $scope.profile;
                            $scope.profile.creditcardnum = "";
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
                            console.log(data.status);
                            $state.go('mainpage');
                            $rootScope.currentUser = {};
                            $mdToast.showSimple("Account Deleted Successfully!");
                        } else {
                            $mdToast.showSimple("Account Deletion failed!");
                        }
                    }, function () {
                        $mdToast.showSimple("Account Deletion failed!");
                    });
            }

        }
        UserServices.getCustomerBidHistory($scope.currentUser.id)
            .then(function (data) {
                if (data.length > 0) {
                    console.log(data);
                    $scope.bidhistory = data;
                }
            });

        UserServices.getCustomerSellHistory($scope.currentUser.id)
            .then(function (data) {
                if (data.length > 0) {
                    console.log(data);
                    $scope.sellhistory = data;
                }
            });

    });