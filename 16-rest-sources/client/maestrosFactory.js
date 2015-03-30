(function () {
	var maestrosFactory =   function ($resource)  {		
		// El uso de recursos simplifica mucho la sintaxis
		return $resource("/api/pub/maestros/");
	};
	
	angular.module('controlCajaApp').factory('maestrosFactory', maestrosFactory);
}());