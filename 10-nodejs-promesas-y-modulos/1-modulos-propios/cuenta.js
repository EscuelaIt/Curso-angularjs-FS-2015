// En este caso 'simulamos' una Clase instanciable
var CuentaExportable = (function(){
	// un módulo puede a su vez requerir de otros
	var Mates = require('./mates.js');

	// La cuenta tendrá una función que acturá de constructor
	var Cuenta = function (propietario) {
		this.propietario = propietario;
		this.saldo = 0;
		console.log("creada cuenta para "  + this.propietario + " con " + this.saldo + "€")
    };

	// una vez creada una variable, se le pueden agregar métodos y propiedades
	Cuenta.prototype = {
		ingresar: function(dinero){
			this.saldo = Mates.sumar(this.saldo,dinero);
			console.log("ingresar: " + dinero + " a " + this.propietario + " tiene " + this.saldo + "€");
		},
		retirar: function(dinero){
			this.saldo = Mates.restar(this.saldo,dinero);
			console.log("retirar: " + dinero + " a " + this.propietario + " tiene " + this.saldo + "€");
		}
	}

	return Cuenta;
})();

// se exporta la variable CuentaExportable,
// dicha variable apunta a una función que retorna un objeto

module.exports = CuentaExportable;
