// La forma más sencilla de interacción es mediante la consola

// Versión básica de interacción con la consola
(function () {
	"use strict";
	// Se abre un buffer para repuerar la entrada del usuario
	var stdin = process.openStdin();

	var nombre = 'Anónimo';
	var edad = 43;

	console.log("¿Cómo te llamas ?");

	// el buffer emite eventos
	// a los eventos se responde con callbacks
	// así funiona el mundo asíncrono
	stdin.addListener("data", alRecibirDatos);

	// función callback que se ejecutara en respuesta al evento
	function alRecibirDatos(data){
		nombre = data.toString().substring(0, data.length - 1);
		imprimir();
	}

	function imprimir() {
		console.log(nombre + " tiene " + edad + " años");
	}

}());
