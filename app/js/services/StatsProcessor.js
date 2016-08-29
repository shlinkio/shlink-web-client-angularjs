
(function () {
    'use strict';

    angular
        .module('shlink')
        .factory('StatsProcessor', [
            StatsProcessor
        ]);

    function StatsProcessor () {
        return {
            processOsStats: processOsStats,
            processBrowserStats: processBrowserStats,
            processReferrersStats: processReferrersStats,
            processCountriesStats: processCountriesStats
        };

        function processOsStats (visits) {
            var stats = {},
                data;

            angular.forEach(visits, function (visit) {
                var userAgent = visit.userAgent;

                if (typeof userAgent === 'undefined' || userAgent === null) {
                    if (typeof stats['Others'] === 'undefined') {
                        stats['Others'] = 1;
                    } else {
                        stats['Others'] += 1;
                    }
                    return;
                }

                userAgent = userAgent.toLowerCase();
                if (userAgent.indexOf('linux') >= 0) {
                    if (typeof stats['Linux'] === 'undefined') {
                        stats['Linux'] = 1;
                    } else {
                        stats['Linux'] += 1;
                    }
                } else if (userAgent.indexOf('windows') >= 0) {
                    if (typeof stats['Windows'] === 'undefined') {
                        stats['Windows'] = 1;
                    } else {
                        stats['Windows'] += 1;
                    }
                } else if (userAgent.indexOf('mac') >= 0) {
                    if (typeof stats['MacOS'] === 'undefined') {
                        stats['MacOS'] = 1;
                    } else {
                        stats['MacOS'] += 1;
                    }
                } else if (userAgent.indexOf('mobi') >= 0) {
                    if (typeof stats['Mobile'] === 'undefined') {
                        stats['Mobile'] = 1;
                    } else {
                        stats['Mobile'] += 1;
                    }
                } else {
                    if (typeof stats['Others'] === 'undefined') {
                        stats['Others'] = 1;
                    } else {
                        stats['Others'] += 1;
                    }
                }
            });

            data = [];
            angular.forEach(stats, function (value) {
                data.push(value);
            });

            return {
                labels: Object.keys(stats),
                data: data
            }
        }

        function processBrowserStats (visits) {
            var stats = {},
                data;

            angular.forEach(visits, function (visit) {
                var userAgent = visit.userAgent;

                if (typeof userAgent === 'undefined' || userAgent === null) {
                    if (typeof stats['Others'] === 'undefined') {
                        stats['Others'] = 1;
                    } else {
                        stats['Others'] += 1;
                    }
                    return;
                }

                userAgent = userAgent.toLowerCase();
                if (userAgent.indexOf('firefox') >= 0) {
                    if (typeof stats['Firefox'] === 'undefined') {
                        stats['Firefox'] = 1;
                    } else {
                        stats['Firefox'] += 1;
                    }
                } else if (userAgent.indexOf('chrome') >= 0) {
                    if (typeof stats['Chrome'] === 'undefined') {
                        stats['Chrome'] = 1;
                    } else {
                        stats['Chrome'] += 1;
                    }
                } else if (userAgent.indexOf('safari') >= 0) {
                    if (typeof stats['Safari'] === 'undefined') {
                        stats['Safari'] = 1;
                    } else {
                        stats['Safari'] += 1;
                    }
                } else if (userAgent.indexOf('opera') >= 0) {
                    if (typeof stats['Opera'] === 'undefined') {
                        stats['Opera'] = 1;
                    } else {
                        stats['Opera'] += 1;
                    }
                } else if (userAgent.indexOf('msie') >= 0) {
                    if (typeof stats['Internet Explorer'] === 'undefined') {
                        stats['Internet Explorer'] = 1;
                    } else {
                        stats['Internet Explorer'] += 1;
                    }
                } else {
                    if (typeof stats['Others'] === 'undefined') {
                        stats['Others'] = 1;
                    } else {
                        stats['Others'] += 1;
                    }
                }
            });

            data = [];
            angular.forEach(stats, function (value) {
                data.push(value);
            });

            return {
                labels: Object.keys(stats),
                data: data
            }
        }

        function processReferrersStats (visits) {
            var stats = {},
                data;

            angular.forEach(visits, function (visit) {
                var referer;

                if (typeof visit.referer === 'undefined' || visit.referer === null) {
                    if (typeof stats['Unknown'] === 'undefined') {
                        stats['Unknown'] = 1;
                    } else {
                        stats['Unknown'] += 1;
                    }
                    return;
                }

                referer = extractDomain(visit.referer);
                if (typeof stats[referer] === 'undefined') {
                    stats[referer] = 1;
                } else {
                    stats[referer] += 1;
                }
            });

            data = [];
            angular.forEach(stats, function (value) {
                data.push(value);
            });

            return {
                labels: Object.keys(stats),
                data: data
            }
        }

        function processCountriesStats (visits) {
            var stats = {},
                data;

            angular.forEach(visits, function (visit) {
                var country;

                if (typeof visit.visitLocation === 'undefined' || visit.visitLocation === null) {
                    if (typeof stats['Unknown'] === 'undefined') {
                        stats['Unknown'] = 1;
                    } else {
                        stats['Unknown'] += 1;
                    }
                    return;
                }

                country = visit.visitLocation.countryName;
                if (typeof stats[country] === 'undefined') {
                    stats[country] = 1;
                } else {
                    stats[country] += 1;
                }
            });

            data = [];
            angular.forEach(stats, function (value) {
                data.push(value);
            });

            return {
                labels: Object.keys(stats),
                data: data
            }
        }
    }

    function extractDomain (url) {
        var domain;
        //find & remove protocol (http, ftp, etc.) and get domain
        if (url.indexOf("://") > -1) {
            domain = url.split('/')[2];
        }
        else {
            domain = url.split('/')[0];
        }

        //find & remove port number
        domain = domain.split(':')[0];

        return domain;
    }
})();
