
(function () {
    'use strict';

    angular
        .module('shlink')
        .controller('ListShortUrlsCtrl', [
            'ApiService',
            '$stateParams',
            'localStorageService',
            ListShortUrlsCtrl
        ]);

    function ListShortUrlsCtrl (ApiService, $stateParams, localStorageService) {
        var vm = this,
            page = $stateParams.page || 1;

        vm.shortUrls = {
            data: []
        };
        vm.currentServer = localStorageService.get('current_server');
        ApiService.listShortUrls(page).then(function (data) {
            vm.shortUrls = data.shortUrls;
        });
    }
})();
