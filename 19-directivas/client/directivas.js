(function () {
    
	
	// El uso más simple es crear directivas para usar como código reutilizable
    function piePagina() {
		return {
            restrict: 'AE',
            replace: 'true',
            template: '<footer class="container"><hr/><p class="text-center">Desarrollado con AngularJS by Google. Por Alberto Basalo - <a href="http://agorabinaria.com">Ágora Binaria SL 2015</a></p></footer>'
        };
    };

	
	
	// Dos mejoras, sacar el html a un fichero externo (tpl-directiva)
    // Usar Transclude para reutilizar el contenido del usuario y hacer la vista más dinámica
    function cabecera() {
        return {
            restrict: 'AE',
            replace: 'true',
            transclude: true,
            templateUrl: '/tpl-cabecera.html'
        };
    };

    // En este caso el cambio más siginificatico es el scope
    // Funciona como un API para la directiva y recibe la info vía atributos
    // Por otro lado en este caso hemos tenido que restringir el uso de la directiva
    // Los elementos tr dentro de un table requieren definirse explícitamente
    function filaMovimiento() {
        return {
            restrict: 'A',
            templateUrl: '/tpl-fila-movimiento.html',
            scope: {
                movimientoplantilla: "=movimientodirectiva"
            }
        };
    }

    // Otro uso de las directivas es extender la funionalidad del DOM sin importar los datos
    // Este es el lugar donde manipular el DOM y jamás en los controladores
    function seleccionado() {
        return {
            link: function ($scope, element, attrs) {
                element.bind('mouseenter', function () {
                    element.css('background-color', 'lightyellow');
                });
                element.bind('mouseleave', function () {
                    element.css('background-color', 'white');
                });
            }
        };
    }

    // Ejemplo no funcional de cómo extender un plugin hecho a medida
    function plugin() {
        return {
            link: function (scope, element, attrs) {
                
                // Obtención de parámetros vía atributos
                var init = scope.$eval(attrs.ngModel);
                var min = scope.$eval(attrs.abSliderMin);
                var max = scope.$eval(attrs.abSliderMax);
                // Configuración básica
                $(element).plugin({
                    value: init,
                    min: min,
                    max: max,
                    tooltip: 'hide'
                });

                // Actualizar la vista cuando cambia el modelo
                scope.$watch(attrs.ngModel, function (valor) {
                    $(element).plugin('setValue', valor);
                });

                // Actualizar el modelo cuando cambia la vista
                $(element).plugin().on('slide', function (evento) {
                    scope.$apply(function () {
                        scope[attrs.ngModel] = evento.value;
                    });
                });
            }
        }
    }

    angular.module('abDirectivas', [])
        .directive('abPiePagina', piePagina)
        .directive('abCabecera', cabecera)
        .directive('abFilaMovimiento', filaMovimiento)
        .directive('abSeleccionado', seleccionado)
        .directive('abPlugin', plugin);
}());