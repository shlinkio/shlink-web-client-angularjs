'use strict';

describe('paginationDirective', function () {
    var directive;

    beforeEach(module('shlink'));
    beforeEach(inject(function (paginationDirective) {
        directive = paginationDirective[0];
    }));

    describe('paginationDirective.construct', function () {
        it('properly initializes directive', function () {
            expect(directive.templateUrl).toEqual('/templates/directives/pagination.html');
            expect(directive.scope).toEqual({
                paginator: '='
            });
        });
    });
});
