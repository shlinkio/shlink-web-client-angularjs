
(function () {
    'use strict';

    angular
        .module('shlink')
        .directive('serversMenu', [
            'ServerService',
            serversMenu
        ]);

    function serversMenu (ServerService) {
        return {
            templateUrl: '/templates/directives/servers-menu.html',
            link: function (scope) {
                scope.servers = ServerService.list();
                scope.serversLength = Object.keys(scope.servers).length;
            }
        };
    }
})();
