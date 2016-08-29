
(function () {
    'use strict';

    angular
        .module('shlink')
        .controller('VisitsCtrl', [
            'ApiService',
            'ServerService',
            'StatsProcessor',
            '$state',
            VisitsCtrl
        ]);

    function VisitsCtrl (ApiService, ServerService, StatsProcessor, $state) {
        var vm = this;

        vm.currentServer = ServerService.getCurrent();
        vm.visitsCount = 0;
        vm.shortUrl = $state.params.shortUrl;
        vm.startDate = null;
        vm.endDate = null;
        vm.changeDates = changeDates;
        vm.osStats = {};
        vm.browserStats = {};
        vm.referrerStats = {};
        vm.countriesStats = {};
        vm.chartOptions = {
            legend: {
                display: true,
                position: 'right'
            }
        };

        // Initialize view
        $('.date').datepicker({format: 'yyyy-mm-dd'});
        changeDates();

        function changeDates () {
            var dates = {};

            if (vm.startDate !== null && vm.startDate !== '') {
                dates['startDate'] = vm.startDate;
            }
            if (vm.endDate !== null && vm.endDate !== '') {
                dates['endDate'] = vm.endDate;
            }

            ApiService.getVisits($state.params.shortCode, dates).then(function (data) {
                var visits = data.visits.data;

                vm.visitsCount = visits.length;
                vm.osStats = StatsProcessor.processOsStats(visits);
                vm.browserStats = StatsProcessor.processBrowserStats(visits);
                vm.referrerStats = StatsProcessor.processReferrersStats(visits);
                vm.countriesStats = StatsProcessor.processCountriesStats(visits);
            });
        }
    }
})();
