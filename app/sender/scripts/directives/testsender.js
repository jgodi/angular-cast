(function () {
    'use strict';

    angular.module('angularCast-sender')
        .directive('testSender', function () {
            return {
                restrict: 'EA',
                templateUrl: 'views/testsender.html',
                scope: false
            };
        });
})();
