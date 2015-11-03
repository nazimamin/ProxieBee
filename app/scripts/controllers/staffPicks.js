'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:StaffPicks
 * @description
 * # StaffPicks
 * Controller of the ndtndtApp
 */
angular.module('ndtndtApp')
    .controller('StaffPicksCtrl', ['$scope', function ($scope) {
        $scope.staffPicksItems = [{
                "title": "Mint Bike: pre-owned",
                "description": "This Bike is in mint condition and works perfectly.",
                "image": "../images/bike.png",
                "bidAmount": "$119",
                "numberOfBids": "20",
                "daysRemaining": "2",
                "bidder": {
                    "name": "Jun Sucks",
                    "profileImage": "../images/bike.png",
                    "ratings": "4",
                    "purchased": "20",
                    "sold": "10"
                }
},
            {
                "title": "Camera: brand new",
                "description": "This Bike is in mint condition and works perfectly.",
                "image": "../images/camera.jpg",
                "bidAmount": "$119",
                "numberOfBids": "20",
                "daysRemaining": "2",
                "bidder": {
                    "name": "Jun Sucks",
                    "profileImage": "../images/bike.png",
                    "ratings": "4",
                    "purchased": "20",
                    "sold": "10"
                }
},
            {
                "title": "Mint Bike: pre-owned",
                "description": "This Bike is in mint condition and works perfectly.",
                "image": "../images/bike.png",
                "bidAmount": "$119",
                "numberOfBids": "20",
                "daysRemaining": "2",
                "bidder": {
                    "name": "Jun Sucks",
                    "profileImage": "../images/bike.png",
                    "ratings": "4",
                    "purchased": "20",
                    "sold": "10"
                }
}

];

    }]);