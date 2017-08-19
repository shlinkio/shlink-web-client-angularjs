
(function () {
    'use strict';

    angular
        .module('shlink')
        .component('serversMenu', {
            restrict: 'E',
            templateUrl: '/templates/directives/servers-menu.html',
            controller: [
                'ServerService',
                '$rootScope',
                ServersMenuCtrl
            ],
            controllerAs: 'vm'
        });

    function ServersMenuCtrl (ServerService, $rootScope) {
        var vm = this;

        refresh();
        $rootScope.$on('refresh_servers', refresh);

        function refresh () {
            vm.servers = ServerService.list();
            vm.serversLength = Object.keys(vm.servers).length;
        }
    }
})();
