(function () {
	var http = require('http');
	var Q = require('q');
	var llamada = {
		host: 'agorabinaria.com'
	};
	var respuesta;

	// llamar aun afunción que devuelve una promesa
	trabajoLento()
		.then(function (res) {
			console.log("Trabajo lento terminado: " + res.statusCode);
		})
		.fail(function (err) {
			console.log("Trabajo lento con error: " + err.message);
		});

	// Esta función promete hacer cosas
	function trabajoLento() {
		var deferred = Q.defer();
		http.get(llamada, function (res) {
			// cuando las hace informa de ello
			deferred.resolve(res);
		}).on('error', function (e) {
			// y cuando falla también
			deferred.reject(e);
		});
		// la respuesta es inmediata... porque realmente no hace nada :-)
		return deferred.promise;
	}

})();