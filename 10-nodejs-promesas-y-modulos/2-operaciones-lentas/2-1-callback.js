(function () {
	var http = require('http');
	var llamada = {
		host: 'agorabinaria.com'
	};
	var respuesta;

	console.log("Trabajo lento iniciado... "  );
	trabajoLento();
	console.log("Trabajo lentoMejorado iniciado... "  );
	trabajoLentoMejorado();
	console.log("Trabajo rápido iniciado... "  );
	trabajoRápido();
	
	// Usando callbacks anónimos
	function trabajoLento() {
		http.get(llamada, function (res) {
			respuesta = res.statusCode;
			console.log("Trabajo lento terminado: " + respuesta);
		}).on('error', function (e) {
			respuesta = e.message;
			console.log("Trabajo lento terminado: " + respuesta);
		});
	}

	function trabajoRápido() {
		console.log("Trabajo rápido terminado :-) "  );
	}

	
	trabajoLentoMejorado();
	// Usando nombres y funciones
	function trabajoLentoMejorado() {
		function alRecibirDatos(res) {
			respuesta = res.statusCode;
			console.log("Trabajo lentoMejorado terminado: " + respuesta);
		}

		function alRecibirError(error) {
			respuesta = error.message;
			console.log("Trabajo lentoMejorado terminado: " + respuesta);
		}
		http.get(llamada, alRecibirDatos)
			.on('error', alRecibirError);
	}
	
})();