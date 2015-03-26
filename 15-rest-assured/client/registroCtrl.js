(function () {
	// El rootScope mantiene un ViewModel al que se puede 'bindear' cualquier vista
	// Es cómodo usarlo para compartir datos de infraestructura
	// No conviene abusar, para reducir la posibilidad de conflictos y polución de la memoria
	// El servicio $cookieStore, viene en el módulo ngCookies 
    var registroCtrl = function ( $state, $http, $cookieStore) {
        var urlBase = "http://localhost:3000/api/";
        var vm = this;
        vm.usuario = {};
        vm.registrar = function () {
            $http.post(urlBase + 'usuarios/', vm.usuario)
                .success(function (data) {
                    //$rootScope.nombre = vm.usuario.email;
                    //$rootScope.mensaje = 'recién creado';
                    $cookieStore.put("sessionId", data);
                    $state.go("total");
                });
        }
		vm.entrar = function () {
            $http.post(urlBase + 'sesiones/', vm.usuario)
                .success(function (data) {
                    //$rootScope.nombre = vm.usuario.email;
                    //$rootScope.mensaje = 'recién entrado';
                    $cookieStore.put("sessionId", data);
                    $state.go("total");
                });
        }
        
    }
    angular.module('controlCajaApp').controller('RegistroCtrl', registroCtrl);
}());