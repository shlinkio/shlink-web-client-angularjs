'use strict';

describe('rangeFilter', function () {
    var rangeFilter;

    beforeEach(module('shlink'));
    beforeEach(inject(function ($filter) {
        rangeFilter = $filter('range');
    }));

    describe('rangeFilter.invoke', function () {
        it('generates a range of provided size', function () {
            expect(rangeFilter([], 5)).toEqual([0, 1, 2, 3, 4]);
            expect(rangeFilter([], 2)).toEqual([0, 1]);
            expect(rangeFilter([], 10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });
    });
});
