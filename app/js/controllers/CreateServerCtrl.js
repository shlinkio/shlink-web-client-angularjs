
(function () {
    'use strict';

    angular
        .module('shlink')
        .controller('CreateServerCtrl', [
            'ServerService',
            '$state',
            '$rootScope',
            CreateServerCtrl
        ]);

    function CreateServerCtrl (ServerService, $state, $rootScope) {
        var vm = this;

        vm.server = {};
        vm.saveNewServer = saveNewServer;

        function saveNewServer () {
            var server = ServerService.create(vm.server);

            ServerService.setCurrent(server);
            $rootScope.$broadcast('refresh_servers');

            $state.go('server.list', {serverId: server.id});
            vm.server = {};
        }
    }
})();
