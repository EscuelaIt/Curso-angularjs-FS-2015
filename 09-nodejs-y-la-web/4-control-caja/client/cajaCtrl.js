(function () {
    // El controlador ahora tiene una dependencia de la factoría
    var cajaCtrl = function (movimientosFactory) {
        var vm = this;
        
        vm.titulo = "Controla tu Cash Flow";
        vm.maestros = {
            categoriasIngresos: ['Nómina', 'Ventas', 'Intereses Depósitos'],
            categoriasGastos: ['Hipotéca', 'Compras', 'Impuestos']
        };
        vm.nuevoMovimiento = {
            esIngreso: 1,
            esGasto: 0,
            importe: 0,
            fecha: new Date()
        };
        // La parte de datos que debe compartir la delega sobre la factoría
        vm.movimientos = movimientosFactory.getMovimientos();
        vm.total = movimientosFactory.getTotal();

        vm.guardarMovimiento = function () {
            if(vm.nuevoMovimiento.esIngreso){
				vm.total.ingresos += vm.nuevoMovimiento.importe;
			}else{
				vm.total.gastos += vm.nuevoMovimiento.importe;
			}
            var auxCopyMov = angular.copy(vm.nuevoMovimiento);
            auxCopyMov.tipo = vm.tipo(auxCopyMov);
            vm.movimientos.push(auxCopyMov);
            vm.nuevoMovimiento.importe = 0;
        }
        vm.balance = function () {
            return vm.total.ingresos - vm.total.gastos
        }
        vm.tipo = function (movimiento) {
            return movimiento.esIngreso && 'Ingreso' || 'Gasto'
        }
    }
    angular.module('controlCajaApp').controller('CajaCtrl', cajaCtrl);
}());