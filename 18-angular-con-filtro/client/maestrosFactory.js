(function () {
	var maestrosFactory =   function ($resource)  {
		// Los resursos son totalmente configurables
		// Una de sus utilidades de 'fábrica' de una caché simple pero potente
		return $resource("/api/pub/maestros/",{},{get: {cache: true}});
	};
	
	angular.module('controlCajaApp').factory('maestrosFactory', maestrosFactory);
}());