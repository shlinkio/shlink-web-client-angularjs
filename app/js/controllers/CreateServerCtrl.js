
(function () {
    'use strict';

    angular
        .module('shlink')
        .controller('CreateServerCtrl', [
            'ServerService',
            '$state',
            CreateServerCtrl
        ]);

    function CreateServerCtrl (ServerService, $state) {
        var vm = this;

        vm.saveNewServer = saveNewServer;

        function saveNewServer () {
            var $form = $('#server-form'),
                server = ServerService.createFromForm($form);

            $form[0].reset();
            ServerService.setCurrent(server);

            $state.go('server.list', {serverId: server.id});
        }
    }
})();
