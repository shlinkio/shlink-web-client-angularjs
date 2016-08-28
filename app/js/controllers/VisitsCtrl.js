
(function () {
    'use strict';

    angular
        .module('shlink')
        .controller('VisitsCtrl', [
            'ApiService',
            '$state',
            VisitsCtrl
        ]);

    function VisitsCtrl (ApiService, $state) {
        var vm = this;

        vm.visits = {};
        ApiService.getVisits($state.params.shortCode).then(function (data) {
            vm.visits = data.visits.data;
        });
    }
})();
