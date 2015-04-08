(function () {
    var movimientoCtrl = function ($stateParams, movimientosFactory) {
        var vm = this;
        vm.movimiento = movimientosFactory.movimientos.get({id:$stateParams._id});
    }
    angular.module('controlCajaApp').controller('MovimientoCtrl', movimientoCtrl);
}());