angular
    .module('UserServices', [])
    .factory('UserServices', ['$http', '$q', '$rootScope', 'Upload', UserServices]);

function UserServices($http, $q, $rootScope, Upload) {

    return {
        currentUser: currentUser,
        login: login,
        signup: signup,
        logout: logout,
        PostImage: PostImage
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
    //taken from https://github.com/danialfarid/ng-file-upload#usage
    function PostImage(file) {
        var defer = $q.defer();
        if (file) {
            file.upload = Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
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