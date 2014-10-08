(function () {
    'use strict';

    angular.module('angularCast-sender')
        .factory('GoogleCastSession', ['$rootScope', 'CAST_APP_ID', 'MESSAGE_NAMESPACE', function ($rootScope, CAST_APP_ID, MESSAGE_NAMESPACE) {
            var castSession = null;

            // Timeout to initialize the API
            if (!chrome.cast || !chrome.cast.isAvailable) {
                setTimeout(initializeCastApi, 1000);
            }

            // Initialize the Google Cast API for use
            function initializeCastApi() {
                var sessionRequest = new chrome.cast.SessionRequest(CAST_APP_ID);
                var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);
                chrome.cast.initialize(apiConfig, onInitSuccess, onError);

                // Broadcast event for initializing API
                console.log('Initializing API');
                $rootScope.$broadcast('INITIALIZING_CAST_API');
            }

            function sessionListener(e) {
                console.log('New Session ID:', e.sessionId);
                castSession = e;
                castSession.addUpdateListener(sessionUpdateListener);
                castSession.addMessageListener(MESSAGE_NAMESPACE, receiverMessage);
            }

            function onInitSuccess() {
                console.log('Successfully Initialized');
            }

            function onSuccess(message) {
                console.log('Success:', message);
            }

            function onError(message) {
                console.log('Error Received:', message);
            }

            function receiverMessage(namespace, message) {
                console.log('Receiver Message (' + namespace + '):', message);
            }

            function receiverListener(e) {
                console.log('Receiver Listener:', e);

                if (e === 'available') {
                    // Broadcast event for cast available
                    console.log('Receiver Available');
                    $rootScope.$broadcast('RECEIVER_AVAILABLE');
                }
            }

            function sessionUpdateListener(isAlive) {
                if (!isAlive) {
                    castSession = null;

                    // Broadcast event for cast available
                    console.log('Session Dead');
                    $rootScope.$broadcast('RECEIVER_DEAD');
                }
            }

            return {
                startChromeCast: function (message) {
                    if (castSession != null) {
                        castSession.sendMessage(MESSAGE_NAMESPACE, JSON.stringify(message), onSuccess, onError);
                    } else {
                        chrome.cast.requestSession(function (e) {
                            castSession = e;
                            castSession.sendMessage(MESSAGE_NAMESPACE, JSON.stringify(message), onSuccess, onError);
                        });
                    }
                }
            }
        }]);
})();
