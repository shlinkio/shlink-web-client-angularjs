'use strict';

describe('ServerService', function () {
    var ServerService,
        localStorageService,
        UuidGenerator,
        id = '3b5225f8-71bd-43d9-946d-c181928cb9f7';

    beforeEach(module('shlink'));
    beforeEach(module(function ($provide) {
        localStorageService = jasmine.createSpyObj('localStorageService', ['get', 'set']);
        UuidGenerator = jasmine.createSpyObj('UuidGenerator', ['generateV4Uuid']);
        UuidGenerator.generateV4Uuid.and.returnValue(id);

        $provide.value('localStorageService', localStorageService);
        $provide.value('UuidGenerator', UuidGenerator);
    }));
    beforeEach(inject(function(_ServerService_){
        ServerService = _ServerService_;
    }));

    describe('ServerService.construct', function () {
        it('properly initializes service', function () {
            expect(ServerService.create).toEqual(jasmine.any(Function));
            expect(ServerService.list).toEqual(jasmine.any(Function));
            expect(ServerService.getById).toEqual(jasmine.any(Function));
            expect(ServerService.deleteById).toEqual(jasmine.any(Function));
            expect(ServerService.getCurrent).toEqual(jasmine.any(Function));
        });
    });

    describe('ServerService.create', function () {
        it('saves provided server on local storage', function () {
            var server = {
                    name: 'foo'
                },
                expectedServer = {
                    name: 'foo',
                    id: id
                },
                servers = {};

            servers[id] = expectedServer;
            expect(ServerService.create(server)).toEqual(expectedServer);
            expect(localStorageService.set).toHaveBeenCalledWith('servers', servers);
        });
    });

    describe('ServerService.list', function () {
        it('returns the list of servers in local storage', function () {
            var expected = {
                '1': {},
                '2': {},
                '3': {}
            };

            localStorageService.get.and.returnValue(expected);
            expect(ServerService.list()).toEqual(expected);
        });

        it('returns empty list when not found in local storage', function () {
            localStorageService.get.and.returnValue(null);
            expect(ServerService.list()).toEqual({});
        });
    });

    describe('ServerService.getById', function () {
        it('returns a server identified by id', function () {
            var servers = {
                '1': {name: 'one'},
                '2': {name: 'two'},
                '3': {name: 'three'}
            };

            localStorageService.get.and.returnValue(servers);
            angular.forEach(servers, function (server, id) {
                expect(ServerService.getById(id)).toEqual(server);
            });
        });

        it('returns null when server is not found', function () {
            localStorageService.get.and.returnValue(null);
            expect(ServerService.getById('123')).toEqual(null);
        });
    });

    describe('ServerService.deleteById', function () {
        it('deletes a server identified by ID from local storage', function () {
            var servers = {
                '1': {name: 'one'},
                '2': {name: 'two'},
                '3': {name: 'three'}
            };

            localStorageService.get.and.returnValue(servers);
            ServerService.deleteById('2');
            expect(localStorageService.set).toHaveBeenCalledWith('servers', {
                '1': {name: 'one'},
                '3': {name: 'three'}
            });
        });

        it('does nothing when server is not found', function () {
            var servers = {
                '1': {name: 'one'},
                '2': {name: 'two'},
                '3': {name: 'three'}
            };

            localStorageService.get.and.returnValue(servers);
            ServerService.deleteById('4');
            expect(localStorageService.set).not.toHaveBeenCalled();
        });
    });

    describe('ServerService.getCurrent', function () {
        it('returns server in local storage under current_server key', function () {
            var expected = {name: 'the server'};

            localStorageService.get.and.returnValue(expected);
            expect(ServerService.getCurrent()).toEqual(expected);
            expect(localStorageService.get).toHaveBeenCalledWith('current_server');
        });
    });

    describe('ServerService.setCurrent', function () {
        it('sets current server when object provided', function () {
            var expected = {name: 'the server'};
            ServerService.setCurrent(expected);
            expect(localStorageService.set).toHaveBeenCalledWith('current_server', expected);
            expect(localStorageService.set).toHaveBeenCalledWith('token', null);
        });

        it('finds server when ID is provided', function () {
            var servers = {
                '1': {name: 'one'},
                '2': {name: 'two'},
                '3': {name: 'three'}
            };

            localStorageService.get.and.returnValue(servers);
            ServerService.setCurrent('2');
            expect(localStorageService.set).toHaveBeenCalledWith('current_server', {name: 'two'});
            expect(localStorageService.get).toHaveBeenCalled();
        });
    });
});
