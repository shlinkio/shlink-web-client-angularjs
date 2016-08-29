
(function () {
    'use strict';

    angular
        .module('shlink')
        .controller('DeleteServerCtrl', [
            'ServerService',
            '$state',
            '$rootScope',
            DeleteServerCtrl
        ]);

    function DeleteServerCtrl (ServerService, $state, $rootScope) {
        var serverId = $state.params.serverId,
            vm = this;

        vm.deleteServer = deleteServer;
        vm.currentServer = ServerService.getCurrent();

        function deleteServer () {
            ServerService.deleteById(serverId);
            $state.go('main');
            $rootScope.$broadcast('refresh_servers');
        }
    }
})();
