
(function () {
    'use strict';

    angular
        .module('shlink')
        .directive('modalImage', [
            modalImage
        ]);

    function modalImage () {
        return {
            templateUrl: '/templates/directives/modalImage.html',
            controller: ['$scope', function ($scope) {
                $scope.imagePath = '';
                $scope.title = '';

                $scope.displayModalImage = function (imagePath, title) {
                    $scope.imagePath = imagePath;
                    $scope.title = title;

                    $('.image-modal').modal();
                };
            }]
        };
    }
})();
