
(function () {
    'use strict';

    angular
        .module('shlink')
        .controller('ListShortUrlsCtrl', [
            'ApiService',
            '$state',
            'ServerService',
            '$rootScope',
            ListShortUrlsCtrl
        ]);

    function ListShortUrlsCtrl (ApiService, $state, ServerService, $rootScope) {
        var vm = this,
            $body = $('body'),
            isFirst = true;

        vm.shortUrls = {};
        vm.currentServer = ServerService.getCurrent();

        vm.refreshList = refreshList;

        function refreshList (tableState) {
            if (isFirst && typeof $rootScope.tableState !== 'undefined') {
                isFirst = false;
                angular.extend(tableState, $rootScope.tableState);
            }
            $rootScope.tableState = tableState;

            ApiService.listShortUrls(buildListParams(tableState)).then(function (data) {
                vm.shortUrls = data.shortUrls;
            });
        }

        function buildListParams (tableState) {
            var params = {
                page: $state.params.page || 1
            };

            // Apply ordering if defined
            if (tableState !== null && typeof tableState.sort.predicate !== 'undefined') {
                params.orderBy = {};
                params.orderBy[tableState.sort.predicate] = tableState.sort.reverse ? 'DESC' : 'ASC';
            }

            // Apply search term if defined
            if (tableState !== null &&
                typeof tableState.search.predicateObject !== 'undefined' &&
                typeof tableState.search.predicateObject.$ !== 'undefined'
            ) {
                params.searchTerm = tableState.search.predicateObject.$;
            }

            return params;
        }

        // FIXME Try to achieve this without jQuery
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
