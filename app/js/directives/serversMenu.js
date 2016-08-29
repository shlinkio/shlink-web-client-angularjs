
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
            templateUrl: '/templates/directives/servers-menu.html',
            link: function (scope) {
                function refresh () {
                    scope.servers = ServerService.list();
                    scope.serversLength = Object.keys(scope.servers).length;
                }

                refresh();
                $rootScope.$on('refresh_servers', refresh);
            }
        };
    }
})();
