(function () {
    'use strict';

    angular.module('angularCast-shared', [])
        // Message namespace for Chrome Cast message bus
        .value('MESSAGE_NAMESPACE', 'urn:x-cast:com.angular.cast.message');
})();
