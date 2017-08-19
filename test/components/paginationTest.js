'use strict';

describe('pagination', function () {
    var paginationController;

    beforeEach(module('shlink'));
    beforeEach(inject(function ($componentController) {
        paginationController = $componentController('pagination', {}, {
            paginator: {foo: 'bar'}
        });
    }));

    describe('paginationController.construct', function () {
        it('properly initializes bindings', function () {
            expect(paginationController.paginator).toEqual({foo: 'bar'});
        });
    });
});
