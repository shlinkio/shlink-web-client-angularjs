
(function () {
    'use strict';

    angular
        .module('shlink')
        .directive('pagination', [
            pagination
        ]);

    function pagination () {
        return {
            restrict: 'E',
            templateUrl: '/templates/directives/pagination.html',
            scope: {
                paginator: '='
            }
        };
    }
})();
