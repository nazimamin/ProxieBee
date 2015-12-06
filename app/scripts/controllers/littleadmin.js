'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:AboutCtrl
 * @description
 * # ProductsCtrl
 * Controller of the ndtndtApp
 */
angular.module('ndtndtApp')
    .controller('LittleAdminCtrl', function ($scope, UserServices, $rootScope, $mdDialog, $mdToast, $stateParams, shareData, ProductServices) {
        $scope.profile = this;
        $scope.profile = $rootScope.currentUser.restinfo;
        $scope.profile.userpassword = "";

        $scope.init = function () {
            $scope.getAllEmployee();
            $scope.getCustomerEmailLists();
            $scope.getAuctionListsByMonitor($rootScope.currentUser.id);
        }
        $scope.PostImage = function (data, errFiles) {
            $scope.ffff = data;
        }

        var aDay = new Date();
        $scope.minDate = new Date(
            aDay.getFullYear(),
            aDay.getMonth(),
            aDay.getDate()
        );

        $scope.maxDate = new Date(
            aDay.getFullYear(),
            aDay.getMonth(),
            aDay.getDate() + 30);

        $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
            'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
            'WY').split(' ').map(function (state) {
            return {
                abbrev: state
            };
        });
        $scope.user = this;
        $scope.user.signup = {};
        $scope.user.signupF = signupF;
        $scope.user.deleteEmployee = deleteEmployee;
        $scope.user.recordsale = recordsale;
        $scope.user.postStaffPicks = postStaffPicks;
        $scope.user.deletestaffpicks = deletestaffpicks;
        $scope.user.postuserpicks = postuserpicks;

        function signupF() {
            UserServices.signup($scope.user.signup, $scope.f)
                .then(function (data) {
                    if (data) {
                        $scope.getCustomerEmailLists();
                        $mdToast.showSimple("Customer Successfully created!");
                        $scope.user.signup = {};
                    } else {
                        $mdToast.showSimple("Customer creation failed. Please try again.");
                    }
                }, function () {
                    $mdToast.showSimple("Customer creation failed. Please try again.");
                });
        }

        function deleteEmployee(data) {
            if (data) {
                data.ssn = data.customerid;
                ////console.log(JSON.stringify(data));
                UserServices.DeleteProfile(data)
                    .then(function (data) {
                        //console.log(data);
                        if (data.status == 'success') {
                            //console.log(data.status);
                            $scope.getCustomerEmailLists();
                            $mdToast.showSimple("Customer Deleted Successfully!");
                        } else {
                            $mdToast.showSimple("Deletion failed. " + data.status);
                        }
                    }, function () {
                        $mdToast.showSimple("Customer Deletion failed!");
                    });
            } else {
                $mdToast.showSimple("Customer Deletion failed!");
            }
        }

        function recordsale(data) {
            if (data) {
                data.ssn = data.customerid;
                //console.log(JSON.stringify(data));
                ProductServices.recordSale(data)
                    .then(function (data) {
                        //console.log(data);
                        if (data.status == 'success') {
                            $scope.getAuctionListsByMonitor($rootScope.currentUser.id);
                            $mdToast.showSimple("Recorded sale Successfully!");
                        } else {
                            $mdToast.showSimple("Record sale failed. " + data.status);
                        }
                    }, function () {
                        $mdToast.showSimple("Record sale failed!");
                    });
            } else {
                $mdToast.showSimple("Record sale failed!");
            }
        }

        $scope.getCustomerEmailLists = function () {
            UserServices.GetCustomers()
                .then(function (data) {
                    if (data.length > 0) {
                        //console.log(data);
                        $scope.customers = data;
                    }
                });

        }
        $scope.getAuctionListsByMonitor = function (id) {
            ProductServices.getListByMonitor(id)
                .then(function (data) {
                    if (data.length > 0) {
                        $scope.monitors = data;
                    }
                });
        }

        $scope.getAllEmployee = function () {
            UserServices.GetEmployees()
                .then(function (data) {
                    if (data.length > 0) {
                        $scope.customerrep = data;
                    }
                });

        }

        function postStaffPicks(id) {
            ProductServices.postStaffpicks(id)
                .then(function (data) {
                    $mdToast.showSimple("Added Successfully");
                });
        }

        function deletestaffpicks(id) {
            ProductServices.deleteStaffpicks(id)
                .then(function (data) {
                    $mdToast.showSimple("Deleted Successfully");
                });
        }

        $scope.showCustomerUpdateDialog = function (ev, data) {
            //console.log(data);
            $mdDialog.show({
                locals: {
                    auctionDataFromProductsCtrl: data
                },
                controller: UpdateCustomerDialogController,
                templateUrl: 'views/edituser.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }
        $scope.viewperson = function (data, ev) {
            $scope.person = data;
            //console.log($scope.person);
            $mdDialog.show({
                locals: {
                    auctionDataFromProductsCtrl: data
                },
                controller: ViewPersonController,
                templateUrl: 'views/viewperson.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }
        $scope.init();
    });

function ViewPersonController($scope, $mdDialog, shareData, auctionDataFromProductsCtrl, UserServices, $mdToast) {
    $scope.person = auctionDataFromProductsCtrl;
    $scope.close = function () {
        $mdDialog.hide();
    };
}

function UpdateCustomerDialogController($scope, $mdDialog, shareData, auctionDataFromProductsCtrl, UserServices, $mdToast) {
    $scope.customer = auctionDataFromProductsCtrl;
    $scope.customer.UpdateEmployee = updateEmployee;
    $scope.customer.UpdateImage = updateImage;

    function updateImage(data, errFiles) {
        //console.log(data);
        $scope.customer.ff = data;
    }

    function updateEmployee(data) {
        data.ssn = data.customerid;
        UserServices.UpdateProfile(data, $scope.customer.ff)
            .then(function (data) {
                if (data) {
                    UserServices.GetCustomers()
                        .then(function (data) {
                            if (data.length > 0) {
                                //console.log(data);
                                // $scope.customer = data;
                            }
                        });
                    $mdToast.showSimple("Profile updated successfully!");
                    $scope.close();
                } else {
                    $mdToast.showSimple("Profile Update failed. Please refresh and try again.");
                }
            }, function () {
                $mdToast.showSimple("Profile Update failed. Please refresh and try again.");
            });
    }
    $scope.close = function () {
        $mdDialog.hide();
    };
}