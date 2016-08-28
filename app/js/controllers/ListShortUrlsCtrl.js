
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
            page = $state.params.page || 1,
            $table = $('.short-urls-list');

        vm.shortUrls = {};
        vm.currentServer = ServerService.getCurrent();
        ApiService.listShortUrls(page).then(function (data) {
            vm.shortUrls = data.shortUrls;
        });

        $table.off('mouseover');
        $table.on('mouseover', 'tbody tr', function () {
            $(this).find('.options').addClass('visible');
        });
        $table.off('mouseleave');
        $table.on('mouseleave', 'tbody tr', function () {
            var $options = $(this).find('.options');

            $options.removeClass('visible');
            if ($options.closest('.open').length > 0) {
                $options.dropdown('toggle');
            }
        });
    }
})();
