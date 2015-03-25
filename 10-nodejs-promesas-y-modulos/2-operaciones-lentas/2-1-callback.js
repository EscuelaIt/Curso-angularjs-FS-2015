(function () {
	// El módulo http puede usarse para responder y para emitir llamadas
	var http = require('http');
	var llamada = {
		host: 'agorabinaria.com'
	};

	console.log("Trabajo lento iniciado... ");
	trabajoLento();
	console.log("Trabajo lentoMejorado iniciado... ");
	trabajoLentoMejorado();
	console.log("Trabajo rápido iniciado... ");
	trabajoRápido();


	// Usando callbacks anónimos
	function trabajoLento() {
		http.get(llamada, function (res) {
			console.log("Trabajo lento terminado: " + res.statusCode);
		}).on('error', function (e) {
			console.eror("Trabajo lento terminado: " + e.message);
		});
	}

	function trabajoRápido() {
		console.log("Trabajo rápido terminado :-) ");
	}

	// Usando nombres y funciones
	function trabajoLentoMejorado() {
		
		function alRecibirDatos(res) {
			console.log("Trabajo lentoMejorado terminado: " + res.statusCode);
		}

		function alRecibirError(e) {
			console.error("Trabajo lentoMejorado terminado: " + e.message);
		}
			// El código queda más legible si usamos funiones con nombre
		http.get(llamada, alRecibirDatos)
			.on('error', alRecibirError);
	}

})();