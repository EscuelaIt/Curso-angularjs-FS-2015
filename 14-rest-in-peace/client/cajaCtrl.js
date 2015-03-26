(function () {
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
		vm.total = {
			ingresos: 0,
			gastos: 0
		};
		// Como los datos están en un servidor
		// las factorias me deovlerán promesas
		// Todo funcionará de manera asíncrona

		movimientosFactory.gettingMovimientos()
			.success(function (movimientos) {
				vm.movimientos = movimientos;
			});

		movimientosFactory.gettingTotal()
			.success(function (total) {
				vm.total = total;
			});

		vm.guardarMovimiento = function () {
			// No necesitamos hacer una copia
			// porque el array ya no es local

			vm.nuevoMovimiento.tipo = vm.tipo(vm.nuevoMovimiento);

			movimientosFactory.postingMovimiento(vm.nuevoMovimiento).success(alHaberGuardado);
			
			
			function alHaberGuardado(resultado) {
				// cuando ha terminado el guardado del movimiento
				// es momento de pedir una actualización de datos
				movimientosFactory.gettingMovimientos()
					.success(function (movimientos) {
						vm.movimientos = movimientos;
					});
				movimientosFactory.gettingTotal()
					.success(function (total) {
						vm.total = total;
					});
				// puedo limpiar movimiento sin problema
				vm.nuevoMovimiento.importe = 0;
			}
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