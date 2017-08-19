
(function () {
    'use strict';

    angular
        .module('shlink')
        .service('UuidGenerator', [
            UuidGenerator
        ]);

    function UuidGenerator () {
        this.generateV4Uuid = generateV4Uuid;

        function generateV4Uuid () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
    }
})();
