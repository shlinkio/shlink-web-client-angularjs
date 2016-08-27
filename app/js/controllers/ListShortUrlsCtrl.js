
(function () {
    'use strict';

    angular
        .module('shlink')
        .controller('ListShortUrlsCtrl', [
            'ApiService',
            '$state',
            'ServerService',
            ListShortUrlsCtrl
        ]);

    function ListShortUrlsCtrl (ApiService, $state, ServerService) {
        var vm = this,
            page = $state.params.page || 1;

        vm.shortUrls = {};
        vm.currentServer = ServerService.getCurrent();
        ApiService.listShortUrls(page).then(function (data) {
            vm.shortUrls = data.shortUrls;
        });
    }
})();
