
(function () {
    'use strict';

    angular
        .module('shlink')
        .component('createShortCodeSection', {
            controller: 'CreateShortUrlCtrl',
            templateUrl: '/templates/short-codes-create.html',
            controllerAs: 'vm'
        });
})();
