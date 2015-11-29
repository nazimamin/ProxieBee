angular
    .module('ProductServices', [])
    .factory('ProductServices', ['$q', '$http', '$rootScope', 'Upload', ProductServices]);

function ProductServices($q, $http, $rootScope, Upload) {
    return {
        getAllProducts: getAllProducts,
        getTopCategories: getTopCategories,
        getCategoryOptions: getCategoryOptions,
        createAuction: createAuction,
        PostImage: PostImage
    };


    //get all auctions
    function getAllProducts() {
        var defer = $q.defer();
        var products = [];
        $http.get($rootScope.restServer + '/getitem')
            .success(function (res) {
                products = res;
                console.log(res);
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
        $http.get($rootScope.restServer + '/topcategory')
            .success(function (res) {
                defer.resolve(res);
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
                defer.resolve(res);
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }

    //create an auciton

    function createAuction(data) {

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
    function PostImage(file) {
        var defer = $q.defer();
        if (file) {
            file.upload = Upload.upload({
              url: $rootScope.restServer + '/upload',
              data: {file: file}
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

}
