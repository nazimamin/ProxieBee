angular
    .module('ProductServices', [])
    .factory('ProductServices', ['$q', '$http', '$rootScope', ProductServices]);

function ProductServices($q, $http, $rootScope) {
    return {
        getAllProducts: getAllProducts,
        getTopCategories: getTopCategories,
        getCategoryOptions: getCategoryOptions,
        createAuction: createAuction
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
        console.log(JSON.stringify(data));
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

}