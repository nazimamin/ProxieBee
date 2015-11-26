angular
    .module('ProductServices', [])
    .factory('ProductServices', ['$q', '$http', '$rootScope', ProductServices]);

function ProductServices($q, $http, $rootScope) {
    return {
        getAllProducts: getAllProducts
    };

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

}