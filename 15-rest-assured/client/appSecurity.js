(function () {
    // Los interceptores de http se configuran con funciones asignadas en el 'config'
    // Las configuraciones afectan a servicios, como el $http
    // Cada servicio configurable ofrece un 'provider' al que 'configurar'
    // En este caso es el $httpProvider
    function configuradorInterceptores($httpProvider) {
        // La configuración admite multiples funciones interceptoras
        // usaremos una función para controlar la seguridad
        $httpProvider.interceptors.push(funcionInterceptoraSeguridad);
    }

    // Esta funión será usada en todas las llamadas http
    // Y controlará el tema de la seguridad
    function funcionInterceptoraSeguridad($injector,$q, $cookieStore, $rootScope) {
        // la función interceptora devuelve un objeto que configura el interceptor
        var interceptor = {}; // Este objeto almacena funciones a llamar en ciertos momentos
        
		// Función que se ejecutarán antes de cada petición
        interceptor.request = function (request) {
            // Enviar en la cabecera el token de sesión previamente guardado en una cookie
            // El acceso las cookies se realiza con el servicio $cookieStore
            request.headers["sessionId"] = $cookieStore.get("sessionId");
            return request || $q.when(request);
        };
        // Función que se ejecutarán despues de cada respuesta con error
        interceptor.responseError = function (response) {
            var state = $injector.get('$state');
            if (response.status === 401) {
                // Si no tenemos cookie o es inválida, recibiremos un 401
                $rootScope.mensaje = "No hay derecho!!!";
                // Redirigimos al usuario a la página de registro
                state.go('registro');
            } else if (response.status === 419) {
                $rootScope.mensaje = "Estoy caduco!!!";
                // Similar al 401, pero con sesión caducada, implica borrar el código actual
                $cookieStore.remove("sessionId")
                state.go('registro');
            };
            return $q.reject(response);
        }
        
		
		return interceptor;
    }

    angular.module('controlCajaApp').config(configuradorInterceptores);
}());