(function () {
    var movimientoCtrl = function ($stateParams, movimientosFactory) {
        var vm = this;
        var movId = $stateParams.id;
        vm.movimiento = movimientosFactory.movimientos.get({id:movId});
    }
    angular.module('controlCajaApp').controller('MovimientoCtrl', movimientoCtrl);
}());