// Una petición recibida por una apliación express
// atraviesa una serie de capas llamdas middleware

(function () {
	"use strict";
	var express = require('express');

	var app = express();

	var options = {
		extensions: ['htm', 'html'],
		maxAge: '1d',
		setHeaders: function (res, path, stat) {
			res.set('x-timestamp', Date.now())
		}
	};
	// Un uso muy frecuente es reservar ujna serie de rutas para derivarlas al disco
	// Tendremos así un directorio para contenido estático
	app.use(express.static(__dirname + '/static', options));
	
	// Otro uso común es la monitorización de la aplicación
	// Interceptor de llamadas
	app.use(function (peticion, respuesta, siguiente) {
		console.log("recibida petición: " + peticion.url);
		// Es muy importante continuar el flujo hacia la sigueinte función
		siguiente();
		// En caso de no hacerlo, se colgaría la llamada
	});
	
	// También es habitual usarlas para sanear la entrada y securizar la aplicación
	
	// Tras atravesar las capas de middleware la llamda llegará al código de negocio
	// Respuesta con una funión in-line a una petición concreta
	app.get('/', function (peticion, respuesta) {
		respuesta.send('Hola Express!');
	});

	app.listen(3000);
}());