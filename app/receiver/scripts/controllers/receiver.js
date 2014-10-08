(function () {
    'use strict';

    angular.module('angularCast-receiver')
        .controller('ReceiverCtrl', ['$scope', 'GoogleCastMessageBus', '$timeout', '$http', function ($scope, GoogleCastMessageBus, $timeout, $http) {
            $scope.view = 'table';
            $scope.filter = 4;
            $scope.consoleMessage = 'No console selected!';
            $scope.games = [];

            GoogleCastMessageBus.onMessage = function (e) {
                console.log('Message Received:', e.data);

                // Parse the setting JSON
                var settings = JSON.parse(e.data);
                console.log('Setting', settings);

                // Set them on the scope
                $scope.view = settings.view;
                $scope.filter = settings.filter;
                $scope.console = settings.console;
                $scope.$apply();
            };

            // Fetch games function
            $scope.fetchGames = function (device) {
                console.log('Attempting to fire REST Call for:', device);
                $scope.consoleMessage = 'Retrieving Games for ' + device;

                console.log('Hitting URL: https://angular-cast.firebaseio.com/games/' + device + '.json');
                $http({ method: 'GET', url: 'https://angular-cast.firebaseio.com/games/' + device + '.json' })
                    .success(function (data) {
                        console.log('Success on REST Call:', data);
                        $scope.games = data;
                        $scope.consoleMessage = '';
                    })
                    .error(function (e) {
                        console.log('Error on REST Call:', e);
                        $scope.games = [];
                        $scope.consoleMessage = 'ERROR';
                    });
            };

            // Watch the console variable, fire rest call to get the data on a timeout
            var callTimeout;
            $scope.$watch('console', function (nv) {
                if (!nv) {
                    return;
                }

                if (!callTimeout) {
                    $timeout.cancel(callTimeout);
                }

                // Call/refresh every 10s
                callTimeout = $timeout(function () {
                    console.log('From the TIMEOUT');
                    $scope.fetchGames(nv);
                }, 10000);

                // Initial call
                $scope.fetchGames(nv);
            });
        }]);
})();
