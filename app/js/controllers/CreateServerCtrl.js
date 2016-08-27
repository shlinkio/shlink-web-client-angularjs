
(function () {
    'use strict';

    angular
        .module('shlink')
        .controller('CreateServerCtrl', [
            'ServerService',
            '$location',
            'localStorageService',
            CreateServerCtrl
        ]);

    function CreateServerCtrl (ServerService, $location, localStorageService) {
        var vm = this;

        vm.saveNewServer = saveNewServer;

        function saveNewServer () {
            var $form = $('#server-form'),
                server = ServerService.createFromForm($form);

            $form[0].reset();
            localStorageService.set('current_server', server);

            $location.path('/server/manage/' + server.id);
        }
    }
})();
