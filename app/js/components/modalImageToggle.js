
(function () {
    'use strict';

    angular
        .module('shlink')
        .component('modalImageToggle', {
            template: '<a ng-click="vm.showModal()" ng-transclude=""></a>',
            transclude: true,
            bindings: {
                title: '=',
                imagePath: '='
            },
            controller: [
                '$uibModal',
                ModalImageToggleCtrl
            ],
            controllerAs: 'vm'
        });

    function ModalImageToggleCtrl ($uibModal) {
        var vm = this;

        vm.showModal = showModal;

        function showModal () {
            $uibModal.open({
                size: 'lg',
                templateUrl: '/templates/directives/modalImage.html',
                controller: function () {
                    this.title = vm.title;
                    this.imagePath = vm.imagePath;
                },
                controllerAs: 'vm'
            }).result.then(angular.noop, angular.noop);
        }
    }
})();
