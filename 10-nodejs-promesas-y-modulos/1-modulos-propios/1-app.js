(function () {
	// requerimos módulos externos... propios
	var Cuenta = require('./cuenta.js');
	// Un patrón común es el de simular clases
	var raton = new Cuenta("Ratón");
	var billetero = new Cuenta("Billetero");

	billetero.ingresar("10");
	raton.ingresar(12.8);
	raton.retirar(2.4);
	billetero.retirar("1");

	console.log(raton.propietario + " tiene " + raton.saldo + " euros");
	console.log(billetero.propietario + " tiene " + billetero.saldo + " euros");

})();
