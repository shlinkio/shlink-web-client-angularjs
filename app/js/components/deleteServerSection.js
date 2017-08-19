
(function () {
    'use strict';

    angular
        .module('shlink')
        .component('deleteServerSection', {
            templateUrl: '/templates/server-delete-confirm.html',
            controller: 'DeleteServerCtrl',
            controllerAs: 'vm'
        });
})();
