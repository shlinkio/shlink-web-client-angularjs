'use strict';

angular
    .module('shlink', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                controller : 'MainCtrl',
                templateUrl: '/templates/main.html'
            });
    }])
    .run(['$rootScope', function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function () {
            $('html, body').scrollTop(0);
        });
    }]);
