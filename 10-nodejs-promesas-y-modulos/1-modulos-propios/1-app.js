(function () {
	// requerimos módulos externos... propios
	var Cuenta = require('./cuenta.js');
	// Un patrón común es el de simular clases
	var ratilla = new Cuenta("Ratilla");
	var billetero = new Cuenta("Billetero");

	billetero.ingresar("10");
	ratilla.ingresar(12.8);
	ratilla.retirar(2.4);
	billetero.retirar("1");

	console.log(ratilla.propietario + " tiene " + ratilla.saldo + " euros");
	console.log(billetero.propietario + " tiene " + billetero.saldo + " euros");

})();
