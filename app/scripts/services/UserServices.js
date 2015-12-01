angular
    .module('UserServices', [])
    .factory('UserServices', ['$http', '$q', '$rootScope', 'Upload', '$window', UserServices]);

function UserServices($http, $q, $rootScope, Upload, $window) {

    return {
        currentUser: currentUser,
        login: login,
        signup: signup,
        logout: logout,
        PostImage: PostImage,
        isLoggedIn: isLoggedIn
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

    function signup(data, file) {
        var randomString = Math.random().toString(36).substring(7);
        console.log(data);
        var FilePath = "profile" + data.ssn + randomString + ".jpg";
        data.personimg = $rootScope.restServer + "/" + FilePath;

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


    function login(data) {
        console.log(JSON.stringify(data));
        var defer = $q.defer();
        $http({
                method: 'POST',
                url: $rootScope.restServer + '/login',
                data: data,
                headers: {
                    'Content-Type': undefined
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


    function isLoggedIn() {
        var isLoggedIn;
        if ($window.sessionStorage) {
            if ($window.sessionStorage.getItem('currentUser')) {
                var data = JSON.parse($window.sessionStorage.getItem('currentUser'));
                $rootScope.currentUser = data;
                $rootScope.currentUser.id = data.customerid;
                $rootScope.currentUser.role = data.role;
                $rootScope.currentUser.personimg = data.personimg;
                $rootScope.currentUser.restinfo = data;
                isLoggedIn = true;
            }
        } else {
            $rootScope.currentUser = {};
        }
        return $rootScope.currentUser;
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