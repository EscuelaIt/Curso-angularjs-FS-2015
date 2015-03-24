(function () {
	"use strict";
	var http = require('http');

	// escuchar en un puerto 
	http.createServer(server).listen(3000);

	// Esta es la función que recoge las peticiones
	function server(req, res) {
		// y envía las respuestas
		res.writeHead({
			'Content-Type': 'text/plain'
		});
		res.end('Hola, esto lo envía NodeJS desde un navegador ;-)');
	}

}());