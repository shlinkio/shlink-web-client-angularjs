
(function () {
    'use strict';

    angular
        .module('shlink')
        .controller('ListShortUrlsCtrl', [
            'ApiService',
            '$stateParams',
            'ServerService',
            ListShortUrlsCtrl
        ]);

    function ListShortUrlsCtrl (ApiService, $stateParams, ServerService) {
        var vm = this,
            page = $stateParams.page || 1;

        vm.shortUrls = {
            data: []
        };
        vm.currentServer = ServerService.getCurrent();
        ApiService.listShortUrls(page).then(function (data) {
            vm.shortUrls = data.shortUrls;
        });
    }
})();
