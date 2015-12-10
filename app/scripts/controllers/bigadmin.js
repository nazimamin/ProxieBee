'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:AboutCtrl
 * @description
 * # ProductsCtrl
 * Controller of the ndtndtApp
 */
angular.module('ndtndtApp')
    .controller('BigAdminCtrl', function ($scope, UserServices, $rootScope, $mdDialog, $mdToast, $stateParams, shareData, ProductServices, $state) {
        $scope.profile = this;
        $scope.profile = $rootScope.currentUser.restinfo;
        $scope.profile.userpassword = "";

        $scope.init = function () {
            $scope.getAllEmployee();
        }
        $scope.PostImage = function (data, errFiles) {
            $scope.fadmin = data;
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
        $scope.user.signupFAdmin = signupFAdmin;
        $scope.user.deleteEmployee = deleteEmployee;
        $scope.user.listsalecustomer_button = listsalecustomer_button;
        // $scope.user.updateEmployee = updateEmployee;
        $scope.user.listsalesitem_button = listsalesitem_button;
        //revenue
        $scope.user.revenueitemtype_button = revenueitemtype_button;
        $scope.user.revenueitemid_button = revenueitemid_button;
        $scope.user.revenuebysellerid_button = revenuebysellerid_button;
        $scope.user.revenuebysellerid_button = revenuebysellerid_button;
        $scope.user.staffrevenue_button = staffrevenue_button;
        $scope.user.customerrevenue_button = customerrevenue_button;
        $scope.user.revenuebymonth_button = revenuebymonth_button;
        $scope.user.bestitemlist_button = bestitemlist_button;

        function signupFAdmin() {
            UserServices.CreateEmployee($scope.user.signup, $scope.fadmin)
                .then(function (data) {
                    if (data) {
                        $mdToast.showSimple("Employee Successfully created!");
                        $scope.user.signup = {};
                        $scope.fadmin = null;
                        $scope.getAllEmployee();
                    } else {
                        $mdToast.showSimple("Employee creation failed. Please try again.");
                    }
                }, function () {
                    $mdToast.showSimple("Employee creation failed. Please try again.");
                });
        }

        function deleteEmployee(data) {
            if (data) {
                data.ssn = data.customerid;
                UserServices.DeleteEmployee(data)
                    .then(function (data) {
                        if (data.status == 'success') {
                            $scope.getAllEmployee();
                            $mdToast.showSimple("Employee Deleted Successfully!");
                        } else {
                            $mdToast.showSimple("Employee Deletion failed!");
                        }
                    }, function () {
                        $mdToast.showSimple("Employee Deletion failed!");
                    });
            } else {
                $mdToast.showSimple("Employee Deletion failed!");
            }
        }

        $scope.getAllEmployee = function () {
            $scope.bigadminpromise = UserServices.GetEmployees()
                .then(function (data) {
                    if (data) {
                        $scope.employees = data;
                    }
                });

        }

        function listsalecustomer_button(id) {
            ProductServices.listofsalesbycustomerid(id)
                .then(function (data) {
                    if (data.length > 0) {
                        $scope.customerSales = data;
                    }
                });
        }

        function listsalesitem_button(id) {
            ProductServices.listOfitemsByitemID(id)
                .then(function (data) {
                    if (data.length > 0) {
                        $scope.itemSales = data;
                    }
                });
        }

        function revenueitemtype_button(id) {
            ProductServices.revenueitemtype(id)
                .then(function (data) {
                    if (data.length > 0) {
                        $scope.itemtyperevenue = data;
                    }
                });
        }

        function revenueitemid_button(id) {
            ProductServices.revenueitemid(id)
                .then(function (data) {
                    if (data.length > 0) {
                        $scope.itemidrevenue = data;
                    }
                });
        }

        function revenuebysellerid_button(id) {
            ProductServices.revenuebysellerid(id)
                .then(function (data) {
                    if (data.length > 0) {
                        $scope.selleridrevenue = data;
                    }
                });
        }

        function staffrevenue_button() {
            ProductServices.revenuebystaff()
                .then(function (data) {
                    if (data.length > 0) {
                        $scope.staffRevenue = data;
                    }
                });
        }

        function customerrevenue_button() {
            ProductServices.revenuebycustomer()
                .then(function (data) {
                    if (data.length > 0) {
                        $scope.customerRevenue = data;
                    }
                });
        }

        function revenuebymonth_button() {
            ProductServices.revenuebymonth()
                .then(function (data) {
                    if (data.length > 0) {
                        $scope.monthRevenue = data;
                    }
                });
        }

        function bestitemlist_button() {
            ProductServices.bestitemlist()
                .then(function (data) {
                    if (data.length > 0) {
                        $scope.bestitemlist = data;
                    }
                });
        }

        $scope.showUpdateDialog = function (ev, data) {
            $scope.employee = data;
            $mdDialog.show({
                locals: {
                    auctionDataFromProductsCtrl: data
                },
                controller: UpdateDialogController,
                templateUrl: 'views/updateemployee.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }
        $scope.init();
    });

function UpdateDialogController($scope, $mdDialog, shareData, auctionDataFromProductsCtrl, UserServices, $mdToast) {
    $scope.employee = auctionDataFromProductsCtrl;
    $scope.employee.UpdateEmployee = updateEmployee;
    $scope.employee.UpdateImage = updateImage;

    function updateImage(data, errFiles) {
        $scope.employee.ff = data;
    }

    function updateEmployee(data) {
        data.ssn = data.customerid;
        UserServices.UpdateEmployee(data, $scope.employee.ff)
            .then(function (data) {
                if (data) {
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


function isPresent(filter) {
    for (var value in filter) {
        if (filter[value]) {
            return false;
        }
    }
    return true;
}