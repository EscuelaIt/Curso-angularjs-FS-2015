(function () {
    var registroCtrl = function ($rootScope, $state, $http, $cookieStore) {
        var urlBase = "http://localhost:3000/api/";
        var vm = this;
        vm.usuario = {};
        vm.entrar = function () {
            $http.post(urlBase + 'sesiones/', vm.usuario)
                .success(function (data) {
                    $rootScope.nombre = vm.usuario.email;
                    $rootScope.mensaje = 'recién entrado';
                    $cookieStore.put("sessionId", data);
                    $state.go("total");
                });
        }
        vm.registrar = function () {
            $http.post(urlBase + 'usuarios/', vm.usuario)
                .success(function (data) {
                    $rootScope.nombre = vm.usuario.email;
                    $rootScope.mensaje = 'recién creado';
                    $cookieStore.put("sessionId", data);
                    $state.go("total");
                });
        }
    }
    angular.module('controlCajaApp').controller('RegistroCtrl', registroCtrl);
}());