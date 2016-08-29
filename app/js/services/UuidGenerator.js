
(function () {
    'use strict';

    angular
        .module('shlink')
        .factory('UuidGenerator', [
            UuidGenerator
        ]);

    function UuidGenerator () {
        return {
            generateV4Uuid: generateV4Uuid
        };

        function generateV4Uuid () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16|0, v = c === 'x' ? r : (r&0x3 | 0x8);
                return v.toString(16);
            });
        }
    }
})();
