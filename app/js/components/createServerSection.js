
(function () {
    'use strict';

    angular
        .module('shlink')
        .component('createServerSection', {
            templateUrl: '/templates/server-create.html',
            controller: 'CreateServerCtrl',
            controllerAs: 'vm'
        });
})();
