(function () {
	// Los filtros se declaran como funciones que a su vez devuelven... funciones
	
	// Esas funciones internas se aplican sobre los valores, 
	// Tienen al menos un parámetro, que sirve de entrada


	// Esta función le quita acentos, guiones bajos, y caracteres raros
	// Los sustituye por guiones bajos
	function limpiarCadena() {
		var funcionFiltro = function (cadena) {
			if (cadena) {
				var resultado = cadena.toLowerCase();
				var patron = /[^-A-Za-z0-9]+/g;
				return resultado.replace(patron, '_');
			}
			else {
				return "";
			}
		};
		return funcionFiltro;
	}
	
	
	// Devuelve un trozo de texto y tres puntos suspensivos... para indicar que hay más...
	// Demuestra que un filtro puede tener parámetros, y cómo tratar valores por defecto.
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

	// Con control de errores y lógica compleja
	function rellenarVacios() {
		var funcionFiltro = function (cadena) {
			try {
				if (!cadena || cadena === undefined || cadena.trim() === "") {
					return '-VACIO-';
				};
			} catch (err) {
				return '-VACIO-';
			}
			return cadena;
		}
		return funcionFiltro;
	}

	// Permite tener filtros predeterminados en un array
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

	
	
//	angular.module('controlCajaApp').filter('nombreDelFiltro', nombreDeLaFuncion);
//	
//	function nombreDeLaFuncion(){
//		return function (expresionIzquierda, parametro1, parametro2){
//			return "algo";
//		}
//	}
	
	// Podemos usar una sintaxis fluida y declarar todo en una solo línea
	// Atención a la declaración de un nuevo módulo genérico
	angular.module('abFiltros', [])
		.filter('abLimpiarCadena', limpiarCadena)
		.filter('abRecortar', recortar)
		.filter('abRellenarVacios', rellenarVacios)
		.filter('abGranImporte', granImporte);
}());