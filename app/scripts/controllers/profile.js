'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the desktopApp
 */
angular.module('ndtndtApp')
    .controller('ProfileCtrl', function ($scope, $rootScope, UserServices, $mdToast, $state, $window) {
        $scope.profile = this;
        $scope.profile = $rootScope.currentUser.restinfo;
        $scope.profile.userpassword = "";
        $scope.PostImage = function (data, errFiles) {
            $scope.f = data;
        }

        $scope.profile.post = post;
        $scope.profile.deleteProfile = deleteProfile;
        $scope.profile.getuserpicks = getuserpicks;

        function post() {
            if ($scope.profile.userpassword.length <= 0) {
                $mdToast.showSimple("You must re-enter password to update your profile.");
            } else {
                if ($scope.profile.creditcardnum) {

                } else {
                    $scope.profile.creditcardnum = "p";
                }

                //$scope.profile.restinfo = null;
                $scope.profile.ssn = $scope.profile.customerid;
                UserServices.UpdateProfile($scope.profile, $scope.f)
                    .then(function (data) {
                        if (data) {
                            //$rootScope.currentUser.restinfo; = $scope.profile;
                            //$rootScope.currentUser = $scope.profile;
                            $rootScope.currentUser.id = $scope.profile.customerid;
                            $rootScope.currentUser.personimg = $scope.profile.personimg;
                            $rootScope.currentUser.admin = $scope.profile.maglevel;
                            $rootScope.currentUser.restinfo = $scope.profile;
                            $window.sessionStorage.setItem('currentUser', JSON.stringify($scope.profile));


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

        function getuserpicks(id) {
            ProductServices.getuserpicks(id)
                .then(function (data) {
                    $scope.getuserpicks = data;
                });
        }


        UserServices.getCustomerBidHistory($scope.currentUser.id)
            .then(function (data) {
                if (data && data.length > 0) {
                    console.log(data);
                    if (data.length == 1 && data[0][0]) {
                        $scope.bidhistory = data[0];
                    } else {
                        $scope.bidhistory = data;
                    }

                }
            });

        UserServices.getCustomerSellHistory($scope.currentUser.id)
            .then(function (data) {
                if (data && data.length > 0) {
                    console.log(data);

                    if (data.length == 1 && data[0][0]) {
                        $scope.sellhistory = data[0];
                    } else {
                        $scope.sellhistory = data;
                    }

                }
            });


    });