(function () {
	var http = require('http');
	// q es un paquete de NodeJS muy utilizado para facilitar la programación asíncrona
	var Q = require('q');
	var llamada = {
		host: 'agorabinaria.com'
	};
	
	// llamar a una función que devuelve una promesa
	trabajoLento()
		.then(function (res) {
			console.log("Trabajo lento terminado: " + res.statusCode);
		})
		.fail(function (e) {
			console.log("Trabajo lento con error: " + e.message);
		});

	// Esta función promete hacer cosas...
	function trabajoLento() {
		var deferred = Q.defer();
		http.get(llamada, function (res) {
			// ... cuando hace lo prometido informa de ello
			deferred.resolve(res);
		}).on('error', function (e) {
			// ... y cuando falla también
			deferred.reject(e);
		});
		// la respuesta es inmediata... porque realmente aún no ha pasado nada :-)
		return deferred.promise;
	}

})();