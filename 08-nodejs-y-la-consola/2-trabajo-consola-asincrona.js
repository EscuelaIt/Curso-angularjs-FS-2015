// Versión básica de interacción con la consola
(function () {
	"use strict";
	var stdin = process.openStdin();

	var nombre = 'Anónimo';
	var edad = 43;

	console.log("¿Cómo te llamas ?");

	// a los eventos se responde con callbacks
	// así funiona el mundo asíncrono
	stdin.addListener("data", alRecibirDatos);

	function alRecibirDatos(data){
		nombre = data.toString().substring(0, data.length - 1);
		imprimir();
	}

	function imprimir() {
		console.log(nombre + " tiene " + edad + " años");
	}

}());
