'use strict';

angular
    .module('shlink', ['ui.router', 'LocalStorageModule'])
    .config(['$stateProvider', 'localStorageServiceProvider', function ($stateProvider, localStorageServiceProvider) {
        // Define routes
        $stateProvider
            .state('main', {
                url: '',
                templateUrl: '/templates/main.html'
            })
            .state('main.2', {
                url: '/'
            })

            .state('create-server', {
                url: '/server/create',
                controller: 'CreateServerCtrl',
                templateUrl: '/templates/server-create.html',
                controllerAs: 'vm'
            })

            .state('server', {
                url: '/server/manage/{serverId}',
                templateUrl: '/templates/server-home.html'
            })
            .state('server.list', {
                url: '/list',
                controller: 'ListShortUrlsCtrl',
                templateUrl: '/templates/short-codes-list.html',
                controllerAs: 'vm'
            })
            .state('server.list.page', {
                url: '/{page:int}'
            })
            .state('server.delete', {
                url: '/delete',
                templateUrl: '/templates/server-delete-confirm.html',
                controller: 'DeleteServerCtrl',
                controllerAs: 'vm'
            });

        // Customize local storage
        localStorageServiceProvider
            .setPrefix('shlink')
            .setStorageType('localStorage');
    }])
    .run([
        '$rootScope',
        'localStorageService',
        'ServerService',
        function ($rootScope, localStorageService, ServerService) {
            // After changing the state, scroll to top
            $rootScope.$on('$stateChangeSuccess', function () {
                $('html, body').scrollTop(0);
            });

            // Before changing the state, check the new server and set it as the default, un-setting the token in the
            // process
            $rootScope.$on('$stateChangeStart', function (
                event,
                toState,
                toParams /*,
                fromState,
                fromParams,
                options */
            ) {
                var serverId = toParams.serverId || null,
                    currentServer = ServerService.getCurrent();

                if (serverId !== null && currentServer !== null && currentServer.id !== serverId) {
                    ServerService.setCurrent(serverId);
                }
            });
        }
    ]);
