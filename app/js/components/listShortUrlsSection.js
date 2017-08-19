
(function () {
    'use strict';

    angular
        .module('shlink')
        .component('listShortUrlsSection', {
            templateUrl: '/templates/short-codes-list.html',
            controller: 'ListShortUrlsCtrl',
            controllerAs: 'vm'
        });
})();
