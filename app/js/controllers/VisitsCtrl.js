
(function () {
    'use strict';

    angular
        .module('shlink')
        .controller('VisitsCtrl', [
            'ApiService',
            'ServerService',
            '$state',
            '$scope',
            VisitsCtrl
        ]);

    function VisitsCtrl (ApiService, ServerService, $state, $scope) {
        var vm = this;

        vm.visits = [];
        vm.shortUrl = $state.params.shortUrl;
        vm.startDate = null;
        vm.endDate = null;
        vm.changeDates = changeDates;

        // Initialize view
        ApiService.getVisits($state.params.shortCode).then(function (data) {
            vm.visits = data.visits.data;
        });
        $('.date').datepicker({format: 'yyyy-mm-dd'});

        function changeDates () {
            var dates = {};

            if (vm.startDate !== null && vm.startDate !== '') {
                dates['startDate'] = vm.startDate;
            }
            if (vm.endDate !== null && vm.endDate !== '') {
                dates['endDate'] = vm.endDate;
            }

            ApiService.getVisits($state.params.shortCode, dates).then(function (data) {
                vm.visits = data.visits.data;
            });
        }
    }
})();
