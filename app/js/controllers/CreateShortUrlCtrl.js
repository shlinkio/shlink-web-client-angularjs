
(function () {
    'use strict';

    angular
        .module('shlink')
        .controller('CreateShortUrlCtrl', [
            'ApiService',
            CreateShortUrlCtrl
        ]);

    function CreateShortUrlCtrl (ApiService) {
        var vm = this;

        vm.creating = false;
        vm.shortUrl = '';
        vm.url = '';
        vm.resp = {isError: false, isSuccess: false};

        vm.createShortCode = function () {
            vm.creating = true;
            ApiService.createShortUrl(vm.url).then(function (data) {
                vm.creating = false;
                vm.resp.isSuccess = true;
                vm.resp.isError = false;
                vm.shortUrl = data.shortUrl;
            }, function (resp) {
                vm.creating = false;
                vm.resp.isSuccess = false;
                vm.resp.isError = true;
                vm.resp.message = resp.data.message;
            });
        };
    }
})();
