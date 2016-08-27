
(function () {
    'use strict';

    angular
        .module('shlink')
        .controller('CreateServerCtrl', [
            CreateServerCtrl
        ]);

    function CreateServerCtrl () {
        var vm = this;

        vm.saveNewServer = saveNewServer;

        function saveNewServer () {

        }
    }
})();
