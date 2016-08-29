
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

        vm.saveNewServer = saveNewServer;

        function saveNewServer () {
            var $form = $('#server-form'),
                server = ServerService.createFromForm($form);

            $form[0].reset();
            ServerService.setCurrent(server);
            $rootScope.$broadcast('refresh_servers');

            $state.go('server.list', {serverId: server.id});
        }
    }
})();
