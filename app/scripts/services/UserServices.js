angular
    .module('UserServices', [])
    .factory('UserServices', ['$http', '$q', '$rootScope', UserServices]);

function UserServices($http, $q, $rootScope) {

    return {
        currentUser: currentUser,
        login: login,
        signup: signup,
        logout: logout
    };

    function currentUser() {
        var defer = $q.defer();
        var currentuser = [];
        $http.get($rootScope.restServer + '/currentUser')
            .success(function (res) {
                currentuser = res;
                defer.resolve(res);
            })
            .error(function (err, status) {
                defer.reject(err);
            })

        return defer.promise;
    }

    function signup(data) {
        console.log(data);
        var defer = $q.defer();
        $http({
                method: 'POST',
                url: $rootScope.restServer + '/createuser',
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


    function login(data) {
        console.log(JSON.stringify(data));
        var defer = $q.defer();
        $http({
                method: 'POST',
                url: $rootScope.restServer + '/login',
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

    function logout() {
        var defer = $q.defer();
        $http.post($rootScope.restServer + '/logout', data)
            .success(function (res) {
                defer.resolve(res);
            })
            .error(function (err, status) {
                defer.reject(err);
            })
        return defer.promise;
    }

}