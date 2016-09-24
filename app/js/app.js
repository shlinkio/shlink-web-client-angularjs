'use strict';

angular
    .module('shlink', ['ui.router', 'LocalStorageModule', 'chart.js', 'angularMoment'])
    .config([
        '$stateProvider',
        'localStorageServiceProvider',
        '$locationProvider',
        function ($stateProvider, localStorageServiceProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

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
                    url: '/server/{serverId}',
                    templateUrl: '/templates/server-home.html'
                })
                .state('server.list', {
                    url: '/list-short-urls/{page:int}',
                    controller: 'ListShortUrlsCtrl',
                    templateUrl: '/templates/short-codes-list.html',
                    controllerAs: 'vm',
                    params: {
                        page: 1
                    }
                })
                .state('server.delete', {
                    url: '/delete',
                    templateUrl: '/templates/server-delete-confirm.html',
                    controller: 'DeleteServerCtrl',
                    controllerAs: 'vm'
                })
                .state('server.create', {
                    url: '/create-short-url',
                    controller: 'CreateShortUrlCtrl',
                    templateUrl: '/templates/short-codes-create.html',
                    controllerAs: 'vm'
                })

                .state('server.short-code', {
                    url: '/short-code/{shortCode}',
                    template: '<ui-view></ui-view>'
                })
                .state('server.short-code.visits', {
                    url: '/visits',
                    templateUrl: '/templates/short-codes-visits.html',
                    controller: 'VisitsCtrl as vm',
                    params: {
                        shortUrl: null
                    }
                });

            // Customize local storage
            localStorageServiceProvider
                .setPrefix('shlink')
                .setStorageType('localStorage');
        }
    ])
    .run([
        '$rootScope',
        'localStorageService',
        'ServerService',
        '$timeout',
        function ($rootScope, localStorageService, ServerService, $timeout) {
            var clipboard = new Clipboard('.clipboard'),
                copyTimer;
            clipboard.on('success', function (e) {
                $timeout.cancel(copyTimer);
                $(e.trigger).tooltip({
                    placement: 'bottom',
                    title: 'Copied!',
                    trigger: 'manual'
                });
                $(e.trigger).tooltip('show');
                copyTimer = $timeout(function () {
                    $(e.trigger).tooltip('hide');
                }, 3000);
            });

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
