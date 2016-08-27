
(function () {
    'use strict';

    angular
        .module('shlink')
        .controller('DeleteServerCtrl', [
            'ServerService',
            '$stateParams',
            '$state',
            DeleteServerCtrl
        ]);

    function DeleteServerCtrl (ServerService, $stateParams, $state) {
        var serverId = $stateParams.serverId,
            vm = this;

        vm.deleteServer = deleteServer;
        vm.currentServer = ServerService.getCurrent();

        function deleteServer () {
            ServerService.deleteById(serverId);
            $state.go('main');
        }
    }
})();
