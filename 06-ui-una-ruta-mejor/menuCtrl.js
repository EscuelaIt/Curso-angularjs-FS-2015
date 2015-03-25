(function () {
    // Ahora el sercvicio se llama $state
    var menuCtrl = function ($state) {
        this.isActive = function (estado) {
            // Tiene funciones más amigables para consultar
			return $state.is(estado);
        }
    }
    angular.module('controlCajaApp').controller('MenuCtrl',menuCtrl);
}());