
(function () {
    'use strict';

    angular
        .module('shlink')
        .service('ServerService', [
            'localStorageService',
            'UuidGenerator',
            ServerService
        ]);

    function ServerService (localStorageService, UuidGenerator) {
        this.create = create;
        this.list = list;
        this.getById = getById;
        this.deleteById = deleteById;

        this.getCurrent = getCurrent;
        this.setCurrent = setCurrent;

        function create (newServer) {
            var servers = localStorageService.get('servers') || {},
                id = UuidGenerator.generateV4Uuid();

            newServer.id = id;
            servers[id] = newServer;
            localStorageService.set('servers', servers);

            return newServer;
        }

        /**
         *
         * @returns {{}}
         */
        function list () {
            return localStorageService.get('servers') || {};
        }

        /**
         *
         * @param serverId
         * @returns {null}
         */
        function getById (serverId) {
            var servers = list();
            return typeof servers[serverId] !== 'undefined' ? servers[serverId] : null;
        }

        /**
         *
         * @param serverId
         */
        function deleteById (serverId) {
            var servers = list();
            if (typeof servers[serverId] !== 'undefined') {
                delete servers[serverId];
                localStorageService.set('servers', servers);
            }
        }


        function getCurrent () {
            return localStorageService.get('current_server');
        }

        function setCurrent (server) {
            var theServer;

            theServer = typeof server !== 'object' ? getById(server) : server;
            localStorageService.set('current_server', theServer);
            localStorageService.set('token', null);
        }
    }
})();
