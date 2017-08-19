
(function () {
    'use strict';

    angular
        .module('shlink')
        .service('StatsProcessor', [
            StatsProcessor
        ]);

    function StatsProcessor () {
        this.processOsStats = processOsStats;
        this.processBrowserStats = processBrowserStats;
        this.processReferrersStats = processReferrersStats;
        this.processCountriesStats = processCountriesStats;

        function processOsStats (visits) {
            return generateStatsResponse(function () {
                var stats = {};

                angular.forEach(visits, function (visit) {
                    var userAgent = visit.userAgent,
                        os = typeof userAgent === 'undefined' || userAgent === null ?
                            'Others' :
                            osFromUserAgent(userAgent);

                    stats[os] = typeof stats[os] === 'undefined' ? 1 : stats[os] + 1;
                });

                return stats;
            });
        }

        function processBrowserStats (visits) {
            return generateStatsResponse(function () {
                var stats = {};

                angular.forEach(visits, function (visit) {
                    var userAgent = visit.userAgent,
                        browser = typeof userAgent === 'undefined' || userAgent === null ?
                            'Others' :
                            browserFromUserAgent(userAgent);

                    stats[browser] = typeof stats[browser] === 'undefined' ? 1 : stats[browser] + 1;
                });

                return stats;
            });
        }

        function processReferrersStats (visits) {
            return generateStatsResponse(function () {
                var stats = {};

                angular.forEach(visits, function (visit) {
                    var notHasDomain = typeof visit.referer === 'undefined' ||
                            visit.referer === null ||
                            visit.referer === '',
                        domain = notHasDomain ? 'Unknown' : extractDomain(visit.referer);

                    stats[domain] = typeof stats[domain] === 'undefined' ? 1 : stats[domain] + 1;
                });

                return stats;
            });
        }

        function processCountriesStats (visits) {
            return generateStatsResponse(function () {
                var stats = {};

                angular.forEach(visits, function (visit) {
                    var notHasCountry = typeof visit.visitLocation === 'undefined' ||
                            visit.visitLocation === null ||
                            typeof visit.visitLocation.countryName === 'undefined' ||
                            visit.visitLocation.countryName === null ||
                            visit.visitLocation.countryName === '',
                        country = notHasCountry ? 'Unknown' : visit.visitLocation.countryName;

                    stats[country] = typeof stats[country] === 'undefined' ? 1 : stats[country] + 1;
                });

                return stats;
            });
        }

        function generateStatsResponse (statsGenerationCallback) {
            var stats = statsGenerationCallback(),
                data = [];

            angular.forEach(stats, function (value) {
                data.push(value);
            });

            return {
                labels: Object.keys(stats),
                data: data
            };
        }
    }

    /**
     *
     * @param {String} userAgent
     * @returns {String}
     */
    function osFromUserAgent (userAgent) {
        userAgent = userAgent.toLowerCase();

        switch (true) {
            case (userAgent.indexOf('linux') >= 0):
                return 'Linux';
            case (userAgent.indexOf('windows') >= 0):
                return 'Windows';
            case (userAgent.indexOf('mac') >= 0):
                return 'MacOS';
            case (userAgent.indexOf('mobi') >= 0):
                return 'Mobile';
            default:
                return 'Others';
        }
    }

    /**
     *
     * @param {String} userAgent
     * @returns {String}
     */
    function browserFromUserAgent (userAgent) {
        userAgent = userAgent.toLowerCase();

        switch (true) {
            case (userAgent.indexOf('firefox') >= 0):
                return 'Firefox';
            case (userAgent.indexOf('chrome') >= 0):
                return 'Chrome';
            case (userAgent.indexOf('safari') >= 0):
                return 'Safari';
            case (userAgent.indexOf('opera') >= 0):
                return 'Opera';
            case (userAgent.indexOf('msie') >= 0):
                return 'Internet Explorer';
            default:
                return 'Others';
        }
    }

    /**
     *
     * @param {String} url
     * @returns {String}
     */
    function extractDomain (url) {
        // Find & remove protocol (http, ftp, etc.) and get domain
        var domain = url.indexOf('://') > -1 ? url.split('/')[2] : url.split('/')[0];
        // Find & remove port number
        domain = domain.split(':')[0];

        return domain;
    }
})();
