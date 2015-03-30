(function () {
	// Como ngResources usa a $http, no hay que cambiar nada a nivel de interceptores
    function configuradorInterceptores($httpProvider) {
        $httpProvider.interceptors.push(funcionInterceptoraSeguridad);
    }

    function funcionInterceptoraSeguridad($q, $injector, $cookieStore, $rootScope) {

        var interceptor = {}; 
        interceptor.request = function (request) {
            request.headers["sessionId"] = $cookieStore.get("sessionId");
            return request || $q.when(request);
        };
        interceptor.responseError = function (response) {
            var state = $injector.get('$state');
            if (response.status === 401) {
                $rootScope.mensaje = "No hay derecho!!!";
                state.go('registro');
            } else if (response.status === 419) {
                $rootScope.mensaje = "Estoy caduco!!!";
                $cookieStore.remove("sessionId")
                state.go('registro');
            };
			return $q.reject(response);
        }
		return interceptor;
    }

    angular.module('controlCajaApp').config(configuradorInterceptores);
}());