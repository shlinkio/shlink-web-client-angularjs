'use strict';

describe('CreateShortUrlCtrl', function () {
    beforeEach(module('shlink'));

    var CreateShortUrlCtrl,
        ApiService,
        forceError,
        forceSuccess;

    beforeEach(inject(function ($controller) {
        forceError = false;
        forceSuccess = false;

        ApiService = jasmine.createSpyObj('ApiService', ['createShortUrl']);
        ApiService.createShortUrl.and.returnValue({then: function (successCallback, errorCallback) {
            if (forceSuccess === true && forceError === false) {
                successCallback({shortUrl: 'the_short_url'});
            }
            if (forceSuccess === false && forceError === true) {
                errorCallback({data: {message: 'the_error_message'}});
            }
        }});

        CreateShortUrlCtrl = $controller('CreateShortUrlCtrl', {
            ApiService: ApiService
        });
    }));

    describe('CreateShortUrlCtrl.construct', function () {
        it('set initial values', function () {
            expect(CreateShortUrlCtrl.creating).toEqual(false);
            expect(CreateShortUrlCtrl.shortUrl).toEqual('');
            expect(CreateShortUrlCtrl.url).toEqual('');
            expect(CreateShortUrlCtrl.resp).toEqual({isError: false, isSuccess: false});
        });
    });

    describe('CreateShortUrlCtrl.createShortCode', function () {
        it('calls ApiService.createShortUrl with provided long URL', function () {
            CreateShortUrlCtrl.url = 'the_long_url';
            CreateShortUrlCtrl.createShortCode();

            expect(ApiService.createShortUrl).toHaveBeenCalledWith('the_long_url', []);
            expect(CreateShortUrlCtrl.creating).toEqual(true);
        });

        it('calls success callback when everything is OK', function () {
            forceSuccess = true;
            forceError = false;
            CreateShortUrlCtrl.createShortCode();

            expect(CreateShortUrlCtrl.creating).toEqual(false);
            expect(CreateShortUrlCtrl.resp).toEqual({isError: false, isSuccess: true});
            expect(CreateShortUrlCtrl.shortUrl).toEqual('the_short_url');
        });

        it('calls success callback when everything is OK', function () {
            forceSuccess = false;
            forceError = true;
            CreateShortUrlCtrl.createShortCode();

            expect(CreateShortUrlCtrl.creating).toEqual(false);
            expect(CreateShortUrlCtrl.resp).toEqual({isError: true, isSuccess: false, message: 'the_error_message'});
        });
    });
});
