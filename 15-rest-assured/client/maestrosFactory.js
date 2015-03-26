(function () {
	// La factoría que me comunica con maestros es similar
	// Es bueno crear una factoría para cada recuros rest
	var maestrosFactory =   function ($http)  {
		// en este caso la ruta es pública, pero a este nivel no influye
		var urlBase = "http://localhost:3000/api/";
		
		var factory  =   {};
        
        factory.gettingMaestros =   function ()  {
            return $http.get(urlBase+'pub/maestros');  
        };

        return factory;
		
	};
	
	angular.module('controlCajaApp').factory('maestrosFactory', maestrosFactory);
}());