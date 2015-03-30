(function () {
    //  $stateParams es el servicio de ui-router para acceder a los parámetros de la ruta   
    var movimientoCtrl = function ($stateParams, movimientosFactory) {
        var vm = this;
        // El acceso es por nombre de parámetro
        var movId = $stateParams.id;
        // Se llama al recurso expuesto por la factoría de recursos 
		// enviándole el objeto que sirve de consulta al método get
        vm.movimiento = movimientosFactory.movimientos.get({id:movId});
    }
    angular.module('controlCajaApp').controller('MovimientoCtrl', movimientoCtrl);
}());