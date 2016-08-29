
(function () {
    'use strict';

    angular
        .module('shlink')
        .controller('CreateShortUrlCtrl', [
            'ApiService',
            '$state',
            CreateShortUrlCtrl
        ]);

    function CreateShortUrlCtrl (ApiService, $state) {
        var vm = this;

        vm.createShortCode = function () {
            var $form = $('#createShortCode'),
                url = $form.find('[name=url]').val();

            ApiService.createShortUrl(url).then(function () {
                $state.go('server.list');
            }, function (resp) {
                $form.append(
                    '<div class="alert alert-danger alert-dismissable">' +
                        '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        '<b>Oops!</b> ' + resp.data.message +
                    '</div>'
                );
            });
        }
    }
})();
