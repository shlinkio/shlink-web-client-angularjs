
(function () {
    'use strict';

    angular
        .module('shlink')
        .filter('color', [
            'localStorageService',
            color
        ]);

    function color (localStorageService) {
        return function (key) {
            var colors = localStorageService.get('colors') || {};

            // If no color is set for this key, generate a random one
            if (typeof colors[key] === 'undefined') {
                colors[key] = getRandomColor();
                localStorageService.set('colors', colors);
            }

            return colors[key];
        };

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    }
})();
