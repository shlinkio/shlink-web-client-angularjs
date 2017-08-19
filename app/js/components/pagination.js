
(function () {
    'use strict';

    angular
        .module('shlink')
        .component('pagination', {
            restrict: 'E',
            templateUrl: '/templates/directives/pagination.html',
            bindings: {
                paginator: '='
            },
            controllerAs: 'vm'
        });
})();
