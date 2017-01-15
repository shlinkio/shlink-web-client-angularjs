
(function () {
    'use strict';

    angular
        .module('shlink')
        .controller('CreateShortUrlCtrl', [
            'ApiService',
            '$timeout',
            CreateShortUrlCtrl
        ]);

    function CreateShortUrlCtrl (ApiService, $timeout) {
        var vm = this,
            copyTimer;

        vm.creating = false;
        vm.shortUrl = '';
        vm.url = '';
        vm.tags = [];
        vm.resp = {isError: false, isSuccess: false};

        vm.createShortCode = createShortCode;
        vm.clipboardSuccess = clipboardSuccess;

        function createShortCode () {
            vm.creating = true;
            ApiService.createShortUrl(vm.url, processTags()).then(function (data) {
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
        }

        function processTags () {
            var tags = [];

            angular.forEach(vm.tags, function (tag) {
                tags.push(tag.text);
            });

            return tags;
        }

        function clipboardSuccess (e) {
            $timeout.cancel(copyTimer);
            $(e.trigger).tooltip({
                placement: 'bottom',
                title: 'Copied!',
                trigger: 'manual'
            });
            $(e.trigger).tooltip('show');
            copyTimer = $timeout(function () {
                $(e.trigger).tooltip('hide');
            }, 3000);
        }
    }
})();
