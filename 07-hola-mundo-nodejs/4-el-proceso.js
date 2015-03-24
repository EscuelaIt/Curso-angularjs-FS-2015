
(function () {
	"use strict";
	process.title = "mi super aplicación";
	imprimir();

	function imprimir() {
		console.log('----------------------------------------');
		console.log('   DATOS DE NODE.JS PROCESS');
		console.log('----------------------------------------');
		console.log('Directorio .......... ' + process.cwd());
		console.log('Exec path ........... ' + process.execPath);
		//console.log('identificador uid ... ' + process.getuid());
		console.log('identificador pid ... ' + process.pid);
		console.log('Título .............. ' + process.title);
		console.log('Versión de Node  .... ' + process.version);
		console.log('Plataforma........... ' + process.platform);
	}

}());
