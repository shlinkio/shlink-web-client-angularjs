
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

        vm.createShortCode = function () {
            var $form = $('#createShortCode'),
                url = $form.find('[name=url]').val();

            $form.find('.alert').remove();
            ApiService.createShortUrl(url).then(function (data) {
                $form.append(
                    '<div class="alert alert-info alert-dismissable">' +
                        '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        '<b>Great!</b> The short URL is <b>' + data.shortUrl + '</b>' +
                    '</div>'
                );
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
