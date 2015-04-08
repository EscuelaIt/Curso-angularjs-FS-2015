(function () {

    function configuradorInterceptores($httpProvider) {
        $httpProvider.interceptors.push(funcionInterceptoraLog);
    }
    
    function funcionInterceptoraLog($log) {

        var interceptor = {}; 
        interceptor.request = function (request) {
            $log.info('request:' + request.url);
            return request ;
        };
        interceptor.responseError = function (response) {
            $log.error("excepción: " + response.status + " de :" + response.config.url);
        }
		return interceptor;
    }

    angular.module('controlCajaApp').config(configuradorInterceptores);
}());