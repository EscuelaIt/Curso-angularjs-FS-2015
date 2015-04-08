(function () {
    var registroCtrl = function ($rootScope, $state, $http, $cookieStore, socketFactory) {
        var urlBase = "http://localhost:3000/api/";
        var vm = this;
        vm.usuario = {};
        vm.entrar = function () {
            $http.post(urlBase + 'sesiones/', vm.usuario)
                .success(function (data) {
                    afterLogIn(data);
                });
        }
        vm.registrar = function () {
            $http.post(urlBase + 'usuarios/', vm.usuario)
                .success(function (data) {
                    afterLogIn(data);
                });
        }

        function afterLogIn(data) {
            $rootScope.nombre = vm.usuario.email;
            $cookieStore.put("sessionId", data);
            socketFactory.connect();
            socketFactory.on('wellcome', function (msgIn) {
                console.log("Me he conectado: " + JSON.stringify(msgIn));
                socketFactory.emit("ackClient", "thanks");
            });
            socketFactory.on('ackServer', function (msgIn) {
                console.log("Han recibido mi mensaje: " + JSON.stringify(msgIn));
            });
            $state.go("total");
        }
    }
    angular.module('controlCajaApp').controller('RegistroCtrl', registroCtrl);
}());