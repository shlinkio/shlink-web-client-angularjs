
(function () {
    'use strict';

    angular
        .module('shlink')
        .controller('CreateServerCtrl', [
            'ServerService',
            '$state',
            'localStorageService',
            CreateServerCtrl
        ]);

    function CreateServerCtrl (ServerService, $state, localStorageService) {
        var vm = this;

        vm.saveNewServer = saveNewServer;

        function saveNewServer () {
            var $form = $('#server-form'),
                server = ServerService.createFromForm($form);

            $form[0].reset();
            localStorageService.set('current_server', server);
            localStorageService.set('token', null);

            $state.go('server', {serverId: server.id});
        }
    }
})();
