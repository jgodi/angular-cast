(function () {
    'use strict';

    angular.module('angularCast-receiver')
        .factory('GoogleCastMessageBus', ['MESSAGE_NAMESPACE', function (MESSAGE_NAMESPACE) {
            // Initialize the chromecast
            cast.receiver.logger.setLevelValue(0);

            var castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
            console.log('Starting Cast Receiver Manager');

            // Handle the 'Ready' event
            castReceiverManager.onReady = function (e) {
                console.log('Ready Event Received:', e);
                castReceiverManager.setApplicationState('Angular Cast');
            };

            // Handle the 'SenderConnected' event
            castReceiverManager.onSenderConnected = function (e) {
                console.log('Sender Connected Event Received:', e);
            };

            // Handle the 'SenderDisconnected' event
            castReceiverManager.onSenderDisconnected = function (e) {
                console.log('Sender Disconnected Event Received:', e);
                // If there castReceiverManager.getSenders().length == 0, can close the window to shut down
            };

            // Create the CastMessageBug to handle messages for the custom namespace
            var castMessageBus = castReceiverManager.getCastMessageBus(MESSAGE_NAMESPACE);

            // Initialize the CastReceiverManager with a base application status
            castReceiverManager.start({
                statusText: 'Application starting...'
            });

            return castMessageBus;
        }]);
})();
