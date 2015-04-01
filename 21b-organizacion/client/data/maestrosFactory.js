(function () {
	var maestrosFactory =   function ($resource)  {
		return $resource("/api/pub/maestros/",{},{get: {cache: true}});
	};
	
	angular.module('controlCajaApp').factory('maestrosFactory', maestrosFactory);
}());