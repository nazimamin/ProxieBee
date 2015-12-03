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
        listOfitemsByitemID: listOfitemsByitemID
    };


    //get all auctions
    function getAllProducts() {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/getitem')
            .success(function (res) {
                if (res[0].length > 1) {
                    console.log(res[0]);
                    defer.resolve(res[0]);
                } else {
                    defer.resolve(res);
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
            .success(function (res) {
                defer.resolve(res);

            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }

    // get all top categories
    function getTopCategories() {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/bestsellerlist')
            .success(function (res) {
                if (res[0].length > 1) {
                    console.log(res[0]);
                    defer.resolve(res[0]);
                } else {
                    defer.resolve(res);
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
            .success(function (res) {
                if (res[0].length > 1) {
                    console.log(res[0]);
                    defer.resolve(res[0]);
                } else {
                    defer.resolve(res);
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
        console.log(data);
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
            console.log(FilePath);
            console.log(file);
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
            .success(function (res) {
                if (res[0].length > 1) {
                    console.log(res[0]);
                    defer.resolve(res[0]);
                } else {
                    defer.resolve(res);
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
            .success(function (res) {
                defer.resolve(res);
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }

    function listOfitemsByitemID(id) {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/listofsalesbyitemname/' + id)
            .success(function (res) {
                defer.resolve(res);
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }
    //get single product
    function listofsalesbycustomerid(id) {
        var defer = $q.defer();
        $http.get($rootScope.restServer + '/listofsalesbycustomerid/' + id)
            .success(function (res) {
                defer.resolve(res);
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }

}