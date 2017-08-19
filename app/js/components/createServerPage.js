
(function () {
    'use strict';

    angular
        .module('shlink')
        .component('createServerPage', {
            templateUrl: '/templates/server-create.html',
            controller: 'CreateServerCtrl',
            controllerAs: 'vm'
        });
})();
