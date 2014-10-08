(function () {
    'use strict';

    angular.module('angularCast-receiver')
        .directive('testReceiver', function () {
            return {
                restrict: 'EA',
                templateUrl: 'views/testreceiver.html',
                scope: false
            };
        });
})();
