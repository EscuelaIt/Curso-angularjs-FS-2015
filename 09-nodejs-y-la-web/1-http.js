(function () {
	"use strict";
	// Ciertas funionaes de node están empaquetadas en módulos
	// Mediante la instrucción requiere, se reclaman los módulos por nombre o ruta,
	// Las funiones de escucha y respuesta http están en el módulo... http
	var http = require('http');

	// escuchar en un puerto
	http.createServer(server).listen(3000);

	// Esta es la función que recoge las peticiones
	// Es un callback que se lanza en cada evento de petición recibida
	function server(req, res) {
		// y envía las respuestas
		res.writeHead({
			'Content-Type': 'text/plain'
		});
		res.end('Hola, esto lo envía NodeJS desde un navegador ;-)');
	}

}());
