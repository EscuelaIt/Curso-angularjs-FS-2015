(function () {

	function limpiarCadena() {
		var funcionFiltro = function (cadena) {
			if (cadena) {
				var resultado = cadena.toLowerCase();
				var patron = /[^-A-Za-z0-9]+/g;
				return resultado.replace(patron, '_');
			}
		};
		return funcionFiltro;
	}
	
	function recortar() {
		var funcionFiltro = function (cadena, largo, quitarInicio) {
			if (!cadena) {
				return ''
			}
			if (!largo) {
				largo = 10
			}
			if (cadena.length <= largo) {
				return cadena
			}
			if (quitarInicio) {
				return '...' + cadena.substring(cadena.length - largo)
			} else {
				return cadena.substring(0, largo) + '...'
			}
		};
		return funcionFiltro;
	}

	function rellenarVacios() {
		var funcionFiltro = function (cadena) {
			try {
				if (!cadena || cadena === undefined || cadena.trim() === "") {
					return '---';
				};
			} catch (err) {
				return '---';
			}
			return cadena;
		}
		return funcionFiltro;
	}

	function granImporte() {
		var funcionFiltro = function (movimientos, valorCorte) {
			if (valorCorte) {
				var filtrados = [];
				for (var i = 0; i < movimientos.length; i++) {
					var mov = movimientos[i];
					if (mov.importe >= valorCorte) {
						filtrados.push(mov);
					}
				}
				return filtrados;
			} else {
				return movimientos;
			}
		};
		return funcionFiltro;
	}

	angular.module('abFiltros', [])
		.filter('abLimpiarCadena', limpiarCadena)
		.filter('abRecortar', recortar)
		.filter('abRellenarVacios', rellenarVacios)
		.filter('abGranImporte', granImporte);
}());