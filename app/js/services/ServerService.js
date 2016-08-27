
(function () {
    'use strict';

    angular
        .module('shlink')
        .factory('ServerService', [
            'localStorageService',
            'UuidGenerator',
            ServerService
        ]);

    function ServerService (localStorageService, UuidGenerator) {
        return {
            createFromForm: createFromForm,
            list: list,
            getById: getById
        };

        /**
         *
         * @param $form
         * @returns {{id: string, name: *, url: *, apiKey: *}}
         */
        function createFromForm ($form) {
            var servers = localStorageService.get('servers') || {},
                id = UuidGenerator.generateV4Uuid(),
                newServer = {
                    id: id,
                    name: $form.find('[name=name]').val(),
                    url: $form.find('[name=url]').val(),
                    apiKey: $form.find('[name=apiKey]').val()
                };

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
    }
})();
