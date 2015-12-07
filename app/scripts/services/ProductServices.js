'use strict';
/**
 * @ngdoc service
 * @name ndtndtApp.ProductServices
 * @description
 * # shareData
 * Service in the ndtndtApp.
 */

angular
    .module('ProductServices', [])
    .factory('ProductServices', ['$q', '$http', '$rootScope', 'Upload', ProductServices]);

function ProductServices($q, $http, $rootScope, Upload) {
    return {
        getAllProducts: getAllProducts,
        getTopCategories: getTopCategories,
        getCategoryOptions: getCategoryOptions,
        createAuction: createAuction,
        PostImage: PostImage,
        placeBid: placeBid,
        getProduct: getProduct,
        getMonitors: getMonitors,
        getAuctionHistory: getAuctionHistory,
        listofsalesbycustomerid: listofsalesbycustomerid,
        listOfitemsByitemID: listOfitemsByitemID,
        SalesReport: SalesReport,
        revenueitemtype: revenueitemtype,
        revenueitemid: revenueitemid,
        revenuebysellerid: revenuebysellerid,
        revenuebystaff: revenuebystaff,
        revenuebycustomer: revenuebycustomer,
        revenuebymonth: revenuebymonth,
        getListByMonitor: getListByMonitor,
        recordSale: recordSale,
        staffpicks: staffpicks,
        postStaffpicks: postStaffpicks,
        deleteStaffpicks: deleteStaffpicks,
        bestitemlist: bestitemlist,
        postuserpicks: postuserpicks,
        getuserpicks: getuserpicks
    };


    //get all auctions
    function getAllProducts() {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/getitem')
            .success(function (data) {
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve([data]);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }
    //get single product
    function getProduct(id) {
        var defer = $q.defer();
        var products = [];
        $http.get($rootScope.restServer + '/getitem/' + id)
            .success(function (data) {
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve(data);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }

    // get all top categories
    function getTopCategories() {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/topcategory')
            .success(function (data) {
            //console.log(JSON.stringify(data));
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve([data]);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }
    // get all top categories
    function getCategoryOptions() {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/categoryoptions')
            .success(function (data) {
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve([data]);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }

    //create an auciton
    function createAuction(data, file) {
        var randomString = Math.random().toString(36).substring(7);
        ////console.log(data);
        var FilePath = "item" + data.sellerid + randomString + ".jpg";
        data.itemimg = $rootScope.restServer + "/uploads/" + FilePath;
        var defer = $q.defer();
        $http({
                method: 'POST',
                url: $rootScope.restServer + '/createitem',
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (res) {
                PostImage(file, FilePath);
                defer.resolve(res);
            })
            .error(function (err, status) {
                defer.reject({
                    err: status
                });
            });
        return defer.promise;
    }
    /*
                    if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else {
                        defer.resolve(data);
                    }
                }
    */

    //pllace a bid
    function placeBid(data) {
        var defer = $q.defer();
        $http({
                method: 'POST',
                url: $rootScope.restServer + '/bidding',
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (res) {
                defer.resolve(res);

            })
            .error(function (err, status) {
                defer.reject({
                    err: status
                });
            });
        return defer.promise;
    }

    //taken from https://github.com/danialfarid/ng-file-upload#usage
    function PostImage(file, FilePath) {
        var defer = $q.defer();
        if (file) {
            Upload.rename(file, FilePath);
            ////console.log(FilePath);
            ////console.log(file);
            file.upload = Upload.upload({
                url: $rootScope.restServer + '/upload',
                data: {
                    file: file
                }
            });

            file.upload.then(function (response) {
                file.result = response.data;
                defer.resolve(file.result);
            }, function (response) {
                if (response.status > 0) {
                    defer.reject(response.status);
                }

            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        }
        return defer.promise;
    }

    function getMonitors() {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/monitors')
            .success(function (data) {
                if (data.length === 1 && data[0][0]) {
                    defer.resolve(data[0]);
                } else if (data[0]) {
                    defer.resolve(data);
                } else {
                    defer.resolve([data]);
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }

    //get auctionhistory
    function getAuctionHistory(id) {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/auctionhistory/' + id)
            .success(function (data) {
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve([data]);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }

    function listOfitemsByitemID(id) {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/listofsalesbyitemname/' + id)
            .success(function (data) {
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve([data]);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }

    function listofsalesbycustomerid(id) {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/listofsalesbycustomerid/' + id)
            .success(function (data) {
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve([data]);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }
    //sales report
    function SalesReport() {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/salesreport')
            .success(function (data) {
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve([data]);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }

    function revenueitemtype(id) {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/revenuebytype/' + id)
            .success(function (data) {
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve([data]);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })
        return defer.promise;
    }

    function revenueitemid(id) {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/revenuebyitem/' + id)
            .success(function (data) {
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve([data]);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }

    function revenuebysellerid(id) {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/revenuebysellerid/' + id)
            .success(function (data) {
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve([data]);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }

    function revenuebystaff() {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/staffrevenue')
            .success(function (data) {
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve([data]);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }

    function revenuebycustomer() {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/customerrevenue')
            .success(function (data) {
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve([data]);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }

    function revenuebymonth() {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/salesreport')
            .success(function (data) {
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve([data]);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }

    function bestitemlist() {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/bestitemlist')
            .success(function (data) {
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve([data]);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }

    function getListByMonitor(id) {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/auctionlistbymonitor/' + id)
            .success(function (data) {
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve([data]);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }


    function recordSale(data) {
        var defer = $q.defer();

        $http.get($rootScope.restServer + '/recordsale/' + data.auctionid)
            .success(function (data) {
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve(data);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }

    function staffpicks() {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/staffpicks')
            .success(function (data) {
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve([data]);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }

    function postStaffpicks(id) {
        var defer = $q.defer();
        $http({
                method: 'POST',
                url: $rootScope.restServer + '/staffpicks',
                data: {
                    "auctionid": id
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (res) {
                defer.resolve(res);
            })
            .error(function (err, status) {
                defer.reject({
                    err: status
                });
            });
        return defer.promise;
    }

    function deleteStaffpicks(id) {
        var defer = $q.defer();
        $http({
                method: 'DELETE',
                url: $rootScope.restServer + '/staffpicks',
                data: {
                    "auctionid": id
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (res) {

                defer.resolve(res);
            })
            .error(function (err, status) {
                defer.reject({
                    err: status
                });
            });
        return defer.promise;
    }

    function postuserpicks(id) {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/userpicks/' + id)
            .success(function (data) {
                //console.log(data);
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve([data]);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })
        return defer.promise;
    }

    function getuserpicks(id) {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/getuserpicks/' + id)
            .success(function (data) {
                if (data) {
                    if (data.length === 1 && data[0][0]) {
                        defer.resolve(data[0]);
                    } else if (data[0]) {
                        defer.resolve(data);
                    } else {
                        defer.resolve([data]);
                    }
                }
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }


}