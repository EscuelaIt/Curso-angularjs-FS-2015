 //Versión más elaborada con callbacks
(function () {
	"use strict";
	// ahora vmos a escribir también en otro buffer
	var stdin = process.stdin,
		stdout = process.stdout; // buffer de salida hacia la conola

	var persona = {
		nombre: 'Anónimo',
		edad: 0
	};

	process.stdin.setEncoding('utf8');

	preguntar("¿Cómo te llamas ?", guardarNombre);

	function guardarNombre(nombre) {
		persona.nombre = nombre;
		// Volver a preguntar
		preguntar("Hola " + persona.nombre + " ¿Cuántos años tienes?", guardarEdad);
	}

	function guardarEdad(edad) {
		persona.edad = edad;
		if (persona.edad >= 18) {
			process.stdout.write("Adelante " + persona.nombre + " de " + persona.edad + " años \n");
		}
		else{
			process.stdout.write("Lo siento " + persona.nombre + " de " + persona.edad + " años \n");
		}
		process.exit();
	}

	function preguntar(pregunta, procesoPosterior) {
		stdin.resume();
		stdout.write(pregunta + ": ");
		// cuando tengamo datos
		stdin.once('data', function (respuesta) {
			// ejecutar el callback que nos han pasado
			// con los datos obtenidos
			procesoPosterior(respuesta.toString().trim());
		});
	}

}());
