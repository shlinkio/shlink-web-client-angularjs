
(function () {
    'use strict';

    angular
        .module('shlink')
        .directive('pagination', [
            pagination
        ]);

    function pagination () {
        return {
            templateUrl: '/templates/directives/pagination.html',
            scope: {
                paginator: '='
            }
        };
    }
})();
