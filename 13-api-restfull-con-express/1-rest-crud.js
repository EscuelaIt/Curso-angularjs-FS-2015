(function () {
	"use strict";
	var express = require('express');
	// Paquete externo para... parsear el body :-)
	var bodyParser = require('body-parser');

	var app = express();

	// Permite recuperar como objetos JavaScript el contenido emitido por el cliente
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	app.use(function (peticion, respuesta, siguiente) {
		console.log("recibida petición: " + peticion.url);
		siguiente();
	});

	// Hasta ahora hemos visto como responder a peticiones GET devolviendo HTML
	app.get('/', function (peticion, respuesta) {
		respuesta.send('Hola Express!');
	});

	// También podemos responder emitiendo JSON
	app.get('/maestros', function (peticion, respuesta) {
		respuesta.json({
			categoriasIngresos: ['Nómina', 'Ventas', 'Intereses Depósitos'],
			categoriasGastos: ['Hipotéca', 'Compras', 'Impuestos']
		});
	});

	var movimientos = [];
	// Tendremos una ruta por recurso
	app.get('/movimientos', function (peticion, respuesta) {
		respuesta.json(movimientos);
	});
	
	// Por supuesto se pueden usar parámetros
	app.get('/movimientos/:movimientoId', function (peticion, respuesta) {
		respuesta.json(movimientos[peticion.params.movimientoId]);
	});

	// Las inserciones se realizan respondiendo al verbo POST
	app.post('/movimientos/', function (peticion, respuesta) {
		var nuevoMovimiento = peticion.body;
		nuevoMovimiento.id = movimientos.length;
		respuesta.json(movimientos.push(nuevoMovimiento));
	});

	// Las actualizaciones se realizan respondiendo al verbo PUT
	app.put('/movimientos/:id', function (peticion, respuesta) {
		movimientos[peticion.params.id]= peticion.body;
		respuesta.json(1);
	});

	// Las eliminaciones se realizan respondiendo al verbo DELETE
	app.delete('/movimientos/:id', function (peticion, respuesta) {
		movimientos.splice(peticion.params.id,1)
		respuesta.json(1);
	});


	app.listen(3000);
}());