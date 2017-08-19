'use strict';

describe('serversMenu', function () {
    var serversMenuCtrl,
        ServerService;

    beforeEach(module('shlink'));
    beforeEach(module(function ($provide) {
        ServerService = jasmine.createSpyObj('ServerService', ['list']);
        ServerService.list.and.returnValue({});

        $provide.value('ServerService', ServerService);
    }));
    beforeEach(inject(function ($componentController) {
        serversMenuCtrl = $componentController('serversMenu', {
            ServerService: ServerService
        });
    }));

    describe('serversMenuCtrl.construct', function () {
        it('properly initializes scope', function () {
            expect(serversMenuCtrl.servers).toEqual({});
            expect(serversMenuCtrl.serversLength).toEqual(0);
            expect(ServerService.list).toHaveBeenCalled();
        });
    });
});
