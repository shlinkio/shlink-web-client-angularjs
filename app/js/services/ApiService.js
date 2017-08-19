
(function () {
    'use strict';

    angular
        .module('shlink')
        .service('ApiService', [
            'localStorageService',
            '$http',
            '$q',
            ApiService
        ]);

    function ApiService (localStorageService, $http, $q) {
        this.authenticate = authenticate;
        this.listShortUrls = listShortUrls;
        this.getShortUrl = getShortUrl;
        this.getVisits = getVisits;
        this.createShortUrl = createShortUrl;

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

        function listShortUrls (params) {
            return performRequest('GET', '/rest/short-codes', undefined, params);
        }

        function getShortUrl (shortCode) {
            return performRequest('GET', '/rest/short-codes/' + shortCode);
        }

        function getVisits (shortCode, dates) {
            var params = dates || undefined;
            return performRequest('GET', '/rest/short-codes/' + shortCode + '/visits', undefined, params);
        }

        function createShortUrl (url, tags) {
            var params = 'longUrl=' + url,
                theTags = tags || [];
            angular.forEach(theTags, function (tag) {
                params += '&tags[]=' + tag;
            });

            return performRequest('POST', '/rest/short-codes', params);
        }

        function performRequest (method, url, data, params, originalDeferred) {
            var token = localStorageService.get('token'),
                deferred = originalDeferred || $q.defer(),
                callback = function (token) {
                    var currentServer = localStorageService.get('current_server'),
                        theData = data || {},
                        theParams = params || {},
                        headers = {
                            Authorization: 'Bearer ' + token
                        };

                    if (method === 'POST' && typeof data !== 'undefined' && data !== null) {
                        headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    }

                    $http({
                        method: method,
                        url: currentServer.url + url,
                        data: theData,
                        params: theParams,
                        headers: headers,
                        paramSerializer: '$httpParamSerializerJQLike'
                    }).then(function (resp) {
                        // Override token
                        var newToken = resp.headers('Authorization');
                        localStorageService.set('token', newToken.substr(7));

                        deferred.resolve(resp.data);
                    }, function (resp) {
                        // If this is not a "invalid token" response, just reject the promise and let the callee
                        // decide what to do
                        if (resp.status !== 401 || resp.data.error !== 'INVALID_AUTH_TOKEN') {
                            deferred.reject(resp);
                            return;
                        }

                        // If the token is invalid, re-authenticate
                        localStorageService.remove('token');
                        performRequest(method, url, data, params, deferred);
                    });
                };

            if (token !== null) {
                callback(token);
            } else {
                authenticate().then(function (resp) {
                    callback(localStorageService.get('token'));
                    return resp;
                });
            }

            return deferred.promise;
        }
    }
})();
