
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
            $body = $('body'),
            page;

        vm.shortUrls = {};
        vm.currentServer = ServerService.getCurrent();

        vm.refreshList = refreshList;

        function refreshList (tableState) {
            console.log(tableState);
            page = $state.params.page || 1;
            ApiService.listShortUrls(page).then(function (data) {
                vm.shortUrls = data.shortUrls;
            });
        }

        $body.off('mouseover', '.short-urls-list tbody tr');
        $body.on('mouseover', '.short-urls-list tbody tr', function () {
            $(this).find('.options').addClass('visible');
        });
        $body.off('mouseleave', '.short-urls-list tbody tr');
        $body.on('mouseleave', '.short-urls-list tbody tr', function () {
            var $options = $(this).find('.options');

            $options.removeClass('visible');
            if ($options.closest('.open').length > 0) {
                $options.dropdown('toggle');
            }
        });
    }
})();
