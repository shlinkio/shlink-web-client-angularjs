
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
            isFirst = true;

        vm.shortUrls = {};
        vm.loading = false;
        vm.filteringByTag = null;
        vm.currentServer = ServerService.getCurrent();

        vm.filterByTag = filterByTag;
        vm.refreshList = refreshList;

        function refreshList (tableState) {
            if (typeof tableState === 'undefined') {
                tableState = $rootScope.tableState;
            }
            if (isFirst && typeof $rootScope.tableState !== 'undefined') {
                isFirst = false;
                angular.extend(tableState, $rootScope.tableState);
            }
            $rootScope.tableState = tableState;

            vm.loading = true;
            ApiService.listShortUrls(buildListParams(tableState)).then(function (data) {
                vm.loading = false;
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

            // Apply tag filtering
            if (typeof $rootScope.tableTag !== 'undefined' && $rootScope.tableTag !== null) {
                params.tags = [$rootScope.tableTag];
            }

            return params;
        }

        function filterByTag (tag) {
            $rootScope.tableTag = tag;
            vm.filteringByTag = tag;
            refreshList();
        }
    }
})();
