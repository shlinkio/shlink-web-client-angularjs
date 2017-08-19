
(function () {
    'use strict';

    angular
        .module('shlink')
        .directive('serversMenu', [
            'ServerService',
            '$rootScope',
            serversMenu
        ]);

    function serversMenu (ServerService, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: '/templates/directives/servers-menu.html',
            link: function (scope) {
                refresh();
                $rootScope.$on('refresh_servers', refresh);

                function refresh () {
                    scope.servers = ServerService.list();
                    scope.serversLength = Object.keys(scope.servers).length;
                }
            }
        };
    }
})();
