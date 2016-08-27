
(function () {
    'use strict';

    angular
        .module('shlink')
        .controller('CreateServerCtrl', [
            'ServerService',
            '$location',
            CreateServerCtrl
        ]);

    function CreateServerCtrl (ServerService, $location) {
        var vm = this;

        vm.saveNewServer = saveNewServer;

        function saveNewServer () {
            var $form = $('#server-form'),
                server = ServerService.createFromForm($form);

            $form[0].reset();
            $location.path('/server/manage/' + server.id);
        }
    }
})();
