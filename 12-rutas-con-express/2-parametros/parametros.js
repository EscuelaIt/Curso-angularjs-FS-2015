(function () {
	"use strict";
	// nuestros módulos, conviven con los de npm
	var Mates = require('./mates.js');
	var express = require('express');

	var app = express();

	app.use(function (peticion, respuesta, siguiente) {
		console.log("recibida petición: " + peticion.url);
		siguiente();
	});

	app.get('/', function (peticion, respuesta) {
		respuesta.send('Hola Express!');
	});

	app.get('/about', function (peticion, respuesta) {
		respuesta.send('Página creada por gente que sabe Express!');
	});

	// La peticiones suelen enviar parámetros
	// se declaran precedidos de :
	app.get('/saludame/:tunombre', function (peticion, respuesta) {
		// se recuperan en la coleccción params de la petición
		respuesta.send('Hola ' + peticion.params.tunombre);
	});

	// Las expresiones de las rutas puede ser complejas
	// Express determinará la función que mejor encaja con una ruta determinada
	// Se pueden usar restricciones para 'validar los parámetros'
	app.get('/mates/:operacion/:numero1/:numero2([0-9])', function (peticion, respuesta) {
		var operacion = peticion.params.operacion;
		var numero1 = peticion.params.numero1;
		var numero2 = peticion.params.numero2;
		var resultado = "Desconocido";
		if ("sumar" === operacion) {
			resultado = Mates.sumar(numero1, numero2);
		} else if ("restar" === operacion) {
			resultado = Mates.restar(numero1, numero2);
		}
		respuesta.send("El resultado de " + operacion + " " + numero1 + " y " + numero2 + " es " + resultado);
	});

	// Además de las espresiones de rutas, tambien podemos ejecutar acciones específicas con un parámatro
	// Este es un buen sitio para sanear la entrada
	app.param('numero1', function (peticion, respuesta, siguiente, valor) {
		console.log('numero1 vale ' + valor);
		if (isNaN(valor)) {
			console.log('numero1 no es un número ');
			// podemos disitnas acciones correctoras o preventivas
			peticion.params.numero1 = 0;
			//siguiente(new Error('numero1 no es un número'));
			//respuesta.status(400).send('numero1 no es un número');
		}
		siguiente();
	});

	app.listen(3000);
}());