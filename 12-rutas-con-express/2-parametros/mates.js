var Mates = (function(){
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

module.exports = Mates;