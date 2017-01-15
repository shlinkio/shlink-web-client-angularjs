'use strict';

describe('serversMenuDirective', function () {
    var directive,
        ServerService;

    beforeEach(module('shlink'));
    beforeEach(module(function ($provide) {
        ServerService = jasmine.createSpyObj('ServerService', ['list']);
        $provide.value('ServerService', ServerService);
    }));
    beforeEach(inject(function (serversMenuDirective) {
        directive = serversMenuDirective[0];
    }));

    describe('serversMenuDirective.construct', function () {
        it('properly initializes directive', function () {
            expect(directive.templateUrl).toEqual('/templates/directives/servers-menu.html');
            expect(directive.link).toEqual(jasmine.any(Function));
        });
    });

    describe('serversMenuDirective.link', function () {
        it('prepares listener for refreshing servers list', function () {
            var scope = {};

            ServerService.list.and.returnValue({});
            directive.link(scope);
            expect(scope.servers).toEqual({});
            expect(scope.serversLength).toEqual(0);
            expect(ServerService.list).toHaveBeenCalled();
        });
    });
});
