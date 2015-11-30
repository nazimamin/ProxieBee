/**
 * @ngdoc service
 * @name desktopApp.shareData
 * @description
 * # shareData
 * Service in the desktopApp.
 */
angular.module('ndtndtApp')
    .service('shareData', function () {
        var auctiondata = this;
        return {
            setAuctionData: function (value) {
                auctiondata = value;
            },
            getAuctionData: function () {
                return auctiondata;
            }
        }
    });
