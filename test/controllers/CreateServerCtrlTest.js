'use strict';

describe('CreateServerCtrl', function () {
    beforeEach(module('shlink'));

    var $controllerCreator,
        CreateServerCtrl,
        ServerService,
        $state,
        $rootScope;

    beforeEach(inject(function(_$controller_){
        $controllerCreator = _$controller_;
    }));
    beforeEach(function () {
        ServerService = {
            create: function () {},
            setCurrent: function () {}
        };
        $state = {
            go: function () {}
        };
        $rootScope = {
            $broadcast: function () {}
        };

        spyOn(ServerService, 'create').and.returnValue({id: 123});
        spyOn(ServerService, 'setCurrent');
        spyOn($state, 'go');
        spyOn($rootScope, '$broadcast');

        CreateServerCtrl = $controllerCreator('CreateServerCtrl', {
            ServerService: ServerService,
            $state: $state,
            $rootScope: $rootScope
        });
    });

    describe('CreateServerCtrl.saveNewServer', function () {
        it('tries to create a server', function () {
            CreateServerCtrl.saveNewServer();
            expect(ServerService.create).toHaveBeenCalled();
            expect(ServerService.setCurrent).toHaveBeenCalledWith({id: 123});
        });

        it('redirects to the new server', function () {
            CreateServerCtrl.saveNewServer();
            expect($state.go).toHaveBeenCalledWith('server.list', {serverId: 123});
        });

        it('broadcasts the "refresh_servers" event', function () {
            CreateServerCtrl.saveNewServer();
            expect($rootScope.$broadcast).toHaveBeenCalledWith('refresh_servers');
        });
    });
});
