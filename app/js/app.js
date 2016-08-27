'use strict';

angular
    .module('shlink', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
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
                templateUrl: '/templates/server-create.html'
            })

            .state('server', {
                url: '/server/manage/{serverId}',
                templateUrl: '/templates/server-home.html'
            });
    }])
    .run(['$rootScope', function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function () {
            $('html, body').scrollTop(0);
        });
    }]);
