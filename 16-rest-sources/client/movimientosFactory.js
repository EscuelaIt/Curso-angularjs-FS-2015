(function () {

    var movimientosFactory =   function ($resource)  {
		// Las factorias terminan siendo una agrupación de recursos
		// En situaciones complejas pueden usarse para configurar promesas, cachés...
        var factory  =   {};
        // Estamos devolviendo recursos, que internamente son promesas
        factory.movimientos =   $resource("/api/priv/movimientos/");
		factory.total =  $resource("/api/priv/total/");
		return factory;
		
		// Realmente los métodos crud desaparecen
		
			
		// una alternativa es devolver las promesas y ocultar las llamadas
		// pero genera más código del necesario
		//factory.total.gettingTotal =  $resource("/api/priv/total/").get().$promise;

    };

    angular.module('controlCajaApp').factory('movimientosFactory', movimientosFactory);
}());