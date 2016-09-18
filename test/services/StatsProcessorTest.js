'use strict';

describe('StatsProcessor', function () {
    beforeEach(module('shlink'));

    // Initialize the StatsProcessor
    var StatsProcessor,
        data = [
            {
                'referer':'',
                'date':'2016-09-15T10:00:40+0200',
                'remoteAddr':'199.16.156.124',
                'userAgent':'Twitterbot/1.0',
                'visitLocation':{
                    'countryCode':'US',
                    'countryName':'United States',
                    'regionName':'California',
                    'cityName':'San Francisco',
                    'latitude':'37.7758',
                    'longitude':'-122.4128',
                    'timezone':'America/Los_Angeles'
                }
            },
            {
                'referer':'',
                'date':'2016-09-11T18:08:27+0200',
                'remoteAddr':'51.255.217.98',
                'userAgent':'Melvil Rawi/1.0',
                'visitLocation':{
                    'countryCode':'FR',
                    'countryName':'France',
                    'regionName':'',
                    'cityName':'',
                    'latitude':'48.8582',
                    'longitude':'2.3387',
                    'timezone':'Europe/Paris'
                }
            },
            {
                'referer':'',
                'date':'2016-09-09T19:56:01+0200',
                'remoteAddr':'51.255.217.97',
                'userAgent':'Melvil Rawi/1.0',
                'visitLocation':{
                    'countryCode':'FR',
                    'countryName':'France',
                    'regionName':'',
                    'cityName':'',
                    'latitude':'48.8582',
                    'longitude':'2.3387',
                    'timezone':'Europe/Paris'
                }
            },
            {
                'referer':'',
                'date':'2016-08-14T11:58:27+0200',
                'remoteAddr':'199.16.156.126',
                'userAgent':'Twitterbot/1.0',
                'visitLocation':{
                    'countryCode':'US',
                    'countryName':'United States',
                    'regionName':'California',
                    'cityName':'San Francisco',
                    'latitude':'37.7697',
                    'longitude':'-122.3933',
                    'timezone':'America/Los_Angeles'
                }
            },
            {
                'referer':null,
                'date':'2016-07-09T00:47:24+0200',
                'remoteAddr':'199.16.156.126',
                'userAgent':'Twitterbot/1.0',
                'visitLocation':{
                    'countryCode':'US',
                    'countryName':'United States',
                    'regionName':'California',
                    'cityName':'San Francisco',
                    'latitude':'37.7697',
                    'longitude':'-122.3933',
                    'timezone':'America/Los_Angeles'
                }
            },
            {
                'referer':null,
                'date':'2016-06-16T09:58:10+0200',
                'remoteAddr':'176.31.212.84',
                'userAgent':'Melvil Rawi/1.0',
                'visitLocation':{
                    'countryCode':'FR',
                    'countryName':'France',
                    'regionName':'',
                    'cityName':'',
                    'latitude':'48.8582',
                    'longitude':'2.3387',
                    'timezone':'Europe/Paris'
                }
            },
            {
                'referer':'https://t.co/DY0hZYIdUp',
                'date':'2016-06-10T15:09:50+0200',
                'remoteAddr':'79.62.222.175',
                'userAgent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                    'Chrome/50.0.2661.102 Safari/537.36',
                'visitLocation':{
                    'countryCode':'IT',
                    'countryName':'Italy',
                    'regionName':'',
                    'cityName':'',
                    'latitude':'43.1479',
                    'longitude':'12.1097',
                    'timezone':'Europe/Rome'
                }
            },
            {
                'referer':null,
                'date':'2016-06-10T10:51:08+0200',
                'remoteAddr':'51.255.51.144',
                'userAgent':'MetaCommentBot; http://metacomment.io/about',
                'visitLocation':{
                    'countryCode':'FR',
                    'countryName':'France',
                    'regionName':'',
                    'cityName':'',
                    'latitude':'48.8582',
                    'longitude':'2.3387',
                    'timezone':'Europe/Paris'
                }
            },
            {
                'referer':'https://t.co/DY0hZYIdUp',
                'date':'2016-06-09T16:41:24+0200',
                'remoteAddr':'12.200.180.5',
                'userAgent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                    'Chrome/51.0.2704.84 Safari/537.36',
                'visitLocation':{
                    'countryCode':'US',
                    'countryName':'United States',
                    'regionName':'New York',
                    'cityName':'New York',
                    'latitude':'40.7588',
                    'longitude':'-73.968',
                    'timezone':'America/New_York'
                }
            },
            {
                'referer':null,
                'date':'2016-06-09T04:00:54+0200',
                'remoteAddr':'50.16.73.212',
                'userAgent':null,
                'visitLocation':{
                    'countryCode':'US',
                    'countryName':'United States',
                    'regionName':'Virginia',
                    'cityName':'Ashburn',
                    'latitude':'39.018',
                    'longitude':'-77.539',
                    'timezone':'America/New_York'
                }
            },
            {
                'referer':'https://t.co/DY0hZYIdUp',
                'date':'2016-06-08T17:10:20+0200',
                'remoteAddr':'66.249.93.60',
                'userAgent':'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5 Build/MOB30H) AppleWebKit/537.36 (KHTML, ' +
                    'like Gecko) Chrome/50.0.2661.89 Mobile Safari/537.36',
                'visitLocation':{
                    'countryCode':'',
                    'countryName':'',
                    'regionName':'',
                    'cityName':'',
                    'latitude':'47',
                    'longitude':'8',
                    'timezone':'Europe/Vaduz'
                }
            },
            {
                'referer':'https://t.co/DY0hZYIdUp',
                'date':'2016-06-08T17:08:40+0200',
                'remoteAddr':'66.249.93.58',
                'userAgent':'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5 Build/MOB30H) AppleWebKit/537.36 (KHTML, ' +
                    'like Gecko) Chrome/50.0.2661.89 Mobile Safari/537.36',
                'visitLocation':{
                    'countryCode':'',
                    'countryName':'',
                    'regionName':'',
                    'cityName':'',
                    'latitude':'47',
                    'longitude':'8',
                    'timezone':'Europe/Vaduz'
                }
            },
            {
                'referer':null,
                'date':'2016-06-08T16:53:16+0200',
                'remoteAddr':'199.16.156.124',
                'userAgent':'Twitterbot/1.0',
                'visitLocation':{
                    'countryCode':'US',
                    'countryName':'United States',
                    'regionName':'California',
                    'cityName':'San Francisco',
                    'latitude':'37.7697',
                    'longitude':'-122.3933',
                    'timezone':'America/Los_Angeles'
                }
            },
            {
                'referer':null,
                'date':'2016-06-08T16:32:07+0200',
                'remoteAddr':'37.187.162.178',
                'userAgent':'Mozilla/5.0 (compatible; PaperLiBot/2.1; ' +
                    'http://support.paper.li/entries/20023257-what-is-paper-li)',
                'visitLocation':{
                    'countryCode':'FR',
                    'countryName':'France',
                    'regionName':'',
                    'cityName':'',
                    'latitude':'48.8582',
                    'longitude':'2.3387',
                    'timezone':'Europe/Paris'
                }
            },
            {
                'referer':null,
                'date':'2016-06-08T16:29:31+0200',
                'remoteAddr':'52.90.157.180',
                'userAgent':'Jakarta Commons-HttpClient/3.0.1',
                'visitLocation':{
                    'countryCode':'US',
                    'countryName':'United States',
                    'regionName':'Virginia',
                    'cityName':'Ashburn',
                    'latitude':'39.018',
                    'longitude':'-77.539',
                    'timezone':'America/New_York'
                }
            },
            {
                'referer':null,
                'date':'2016-06-08T16:23:06+0200',
                'remoteAddr':'150.70.173.5',
                'userAgent':'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)',
                'visitLocation':{
                    'countryCode':'JP',
                    'countryName':'Japan',
                    'regionName':'',
                    'cityName':'',
                    'latitude':'35.69',
                    'longitude':'139.69',
                    'timezone':'Asia/Tokyo'
                }
            },
            {
                'referer':null,
                'date':'2016-06-08T16:22:52+0200',
                'remoteAddr':'199.16.156.126',
                'userAgent':'Twitterbot/1.0',
                'visitLocation':{
                    'countryCode':'US',
                    'countryName':'United States',
                    'regionName':'California',
                    'cityName':'San Francisco',
                    'latitude':'37.7697',
                    'longitude':'-122.3933',
                    'timezone':'America/Los_Angeles'
                }
            },
            {
                'referer':'https://t.co/DY0hZYIdUp',
                'date':'2016-06-08T16:22:21+0200',
                'remoteAddr':'188.87.143.90',
                'userAgent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                    'Chrome/49.0.2623.87 Safari/537.36',
                'visitLocation':{
                    'countryCode':'ES',
                    'countryName':'Spain',
                    'regionName':'Aragon',
                    'cityName':'Zaragoza',
                    'latitude':'41.6561',
                    'longitude':'-0.8773',
                    'timezone':'Europe/Madrid'
                }
            },
            {
                'referer':null,
                'date':'2016-06-08T16:21:29+0200',
                'remoteAddr':'136.243.154.105',
                'userAgent':'MetaURI API/2.0 +metauri.com',
                'visitLocation':{
                    'countryCode':'DE',
                    'countryName':'Germany',
                    'regionName':'',
                    'cityName':'',
                    'latitude':'51.2993',
                    'longitude':'9.491',
                    'timezone':''
                }
            },
            {
                'referer':null,
                'date':'2016-06-08T16:20:50+0200',
                'remoteAddr':'144.76.22.234',
                'userAgent':'Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US; rv:1.8.0.8) Gecko/20061025 ' +
                    'Firefox/1.5.0.8',
                'visitLocation':{
                    'countryCode':'DE',
                    'countryName':'Germany',
                    'regionName':'',
                    'cityName':'',
                    'latitude':'51.2993',
                    'longitude':'9.491',
                    'timezone':''
                }
            },
            {
                'referer':null,
                'date':'2016-06-08T16:20:48+0200',
                'remoteAddr':'199.16.156.124',
                'userAgent':'Twitterbot/1.0',
                'visitLocation':{
                    'countryCode':'US',
                    'countryName':'United States',
                    'regionName':'California',
                    'cityName':'San Francisco',
                    'latitude':'37.7697',
                    'longitude':'-122.3933',
                    'timezone':'America/Los_Angeles'
                }
            },
            {
                'referer':null,
                'date':'2016-06-08T16:20:03+0200',
                'remoteAddr':'66.249.92.118',
                'userAgent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                    'Chrome/49.0.2623.75 Safari/537.36 Google (+https://developers.google.com/+/web/snippet/)',
                'visitLocation':{
                    'countryCode':'US',
                    'countryName':'United States',
                    'regionName':'California',
                    'cityName':'Mountain View',
                    'latitude':'37.4192',
                    'longitude':'-122.0574',
                    'timezone':'America/Los_Angeles'
                }
            },
            {
                'referer':'https://m.facebook.com',
                'date':'2016-06-08T16:19:58+0200',
                'remoteAddr':'188.87.143.90',
                'userAgent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                    'Chrome/49.0.2623.87 Safari/537.36',
                'visitLocation':{
                    'countryCode':'ES',
                    'countryName':'Spain',
                    'regionName':'Aragon',
                    'cityName':'Zaragoza',
                    'latitude':'41.6561',
                    'longitude':'-0.8773',
                    'timezone':'Europe/Madrid'
                }
            }
        ];
    beforeEach(inject(function(_StatsProcessor_){
        StatsProcessor = _StatsProcessor_;
    }));

    describe('StatsProcessor.processOsStats', function () {
        it('properly parses all OS stats', function () {
            var resp = StatsProcessor.processOsStats(data);

            expect(resp.labels).toContain('Others');
            expect(resp.labels).toContain('MacOS');
            expect(resp.labels).toContain('Linux');
            expect(resp.labels).toContain('Windows');

            expect(resp.data).toEqual([14, 2, 5, 2]);
        });
    });

    describe('StatsProcessor.processBrowserStats', function () {
        it('properly parses browser stats', function () {
            var resp = StatsProcessor.processBrowserStats(data);

            expect(resp.labels).toContain('Others');
            expect(resp.labels).toContain('Chrome');
            expect(resp.labels).toContain('Internet Explorer');
            expect(resp.labels).toContain('Firefox');

            expect(resp.data).toEqual([14, 7, 1, 1]);
        });
    });

    describe('StatsProcessor.processReferrersStats', function () {
        it('properly parses referrer stats', function () {
            var resp = StatsProcessor.processReferrersStats(data);

            expect(resp.labels).toContain('Unknown');
            expect(resp.labels).toContain('t.co');
            expect(resp.labels).toContain('m.facebook.com');

            expect(resp.data).toEqual([17, 5, 1]);
        });
    });

    describe('StatsProcessor.processCountriesStats', function () {
        it('properly parses countries stats', function () {
            var resp = StatsProcessor.processCountriesStats(data);

            expect(resp.labels).toContain('United States');
            expect(resp.labels).toContain('France');
            expect(resp.labels).toContain('Italy');
            expect(resp.labels).toContain('Unknown');
            expect(resp.labels).toContain('Japan');
            expect(resp.labels).toContain('Spain');
            expect(resp.labels).toContain('Germany');

            expect(resp.data).toEqual([10, 5, 1, 2, 1, 2, 2]);
        });
    });
});
