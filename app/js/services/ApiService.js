
(function () {
    'use strict';

    angular
        .module('shlink')
        .factory('ApiService', [
            'localStorageService',
            '$http',
            '$q',
            ApiService
        ]);

    function ApiService (localStorageService, $http, $q) {
        return {
            authenticate: authenticate,
            listShortUrls: listShortUrls
        };

        function authenticate () {
            var currentServer = localStorageService.get('current_server');
            if (currentServer === null) {
                return;
            }

            return $http({
                method: 'POST',
                url: currentServer.url + '/rest/authenticate',
                data: 'apiKey=' + currentServer.apiKey,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (resp) {
                localStorageService.set('token', resp.data.token);
            });
        }

        function listShortUrls (page) {
            var params = typeof page !== 'undefined' && page !== null ? {page: page} : undefined;
            return performRequest('GET', '/rest/short-codes', undefined, params);
        }

        function performRequest (method, url, data, params, originalDeferred) {
            var token = localStorageService.get('token'),
                deferred = originalDeferred || $q.defer(),
                callback = function (token) {
                    var currentServer = localStorageService.get('current_server'),
                        theData = data || {},
                        theParams = params || {};

                    $http({
                        method: method,
                        url: currentServer.url + url,
                        data: theData,
                        params: theParams,
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    }).then(function (resp) {
                        // Override token
                        var newToken = resp.headers('Authorization');
                        localStorageService.set('token', newToken.substr(7));

                        deferred.resolve(resp.data);
                    }, function (resp) {
                        if (resp.status !== 401 || resp.data.error !== 'INVALID_AUTH_TOKEN') {
                            return;
                        }

                        // If the token is invalid, re-authenticate
                        localStorageService.set('token', null);
                        performRequest(method, url, data, params, deferred);
                    });
                };

            if (token !== null) {
                callback(token);
            } else {
                authenticate().then(function (resp) {
                    callback(localStorageService.get('token'));
                });
            }

            return deferred.promise;
        }
    }
})();
