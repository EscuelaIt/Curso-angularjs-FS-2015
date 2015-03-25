(function () {
	"use strict";
	// Se requier la presencia del módulo de express
	// previamente instalado usando 
	// npm install express -save
	var express = require('express');

	// Es frecuente llamar app a la instancia de express 
	var app = express();

	// Respondemos a las peticiones mediante un mecanismo de suscripción y callbacks
	app.get('/', alRecibirPeticion);
	
	// función que se ejecutará cuando nos llamen 
	function alRecibirPeticion(peticion, respuesta){
		respuesta.send('Hola Express!');
	}
	
	// Configuramos la aplicación para escuchar en el puerto 3000
	app.listen(3000);
}()); 