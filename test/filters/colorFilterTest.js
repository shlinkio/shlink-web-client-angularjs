'use strict';

describe('colorFilter', function () {
    var colorFilter,
        localStorageService;

    beforeEach(module('shlink'));
    beforeEach(module(function ($provide) {
        localStorageService = jasmine.createSpyObj('localStorageService', ['get', 'set']);
        $provide.value('localStorageService', localStorageService);
    }));
    beforeEach(inject(function ($filter) {
        colorFilter = $filter('color');
    }));

    describe('colorFilter.invoke', function () {
        it('generates a new random color when key is not found in local storage', function () {
            expect(colorFilter('foo')).toEqual(jasmine.any(String));
            expect(localStorageService.get).toHaveBeenCalledWith('colors');
            expect(localStorageService.set).toHaveBeenCalled();
        });

        it('provides existing color when already set', function () {
            localStorageService.get.and.returnValue({
                'foo': '#f00'
            });
            expect(colorFilter('foo')).toEqual('#f00');
            expect(localStorageService.get).toHaveBeenCalledWith('colors');
            expect(localStorageService.set).not.toHaveBeenCalled();
        });
    });
});
