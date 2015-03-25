// Otro caso muy común es disponer de una
// Biblioteca de funciones de ayuda
var Matematicas = (function(){
	return {
		sumar: function(a,b){
			return obtenerNumero(a) + obtenerNumero(b);
		},
		restar: function(a,b){
			return obtenerNumero(a) - obtenerNumero(b);
		}
	}

	function obtenerNumero(texto){
		return texto*1;
	}

})();

// exportamos una variable
// que apunta a una función
// que devuelve un objeto
module.exports = Matematicas;
