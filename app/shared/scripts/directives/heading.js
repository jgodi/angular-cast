(function () {
    'use strict';

    angular.module('angularCast-shared')
        .directive('appHeading', function () {
            return {
                restrict: 'EA',
                templateUrl: 'views/heading.html',
                scope: false
            };
        });
})();
