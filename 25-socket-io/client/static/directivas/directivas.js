(function () {
    function piePagina() {
        return {
            restrict: 'AE',
            replace: 'true',
            template: '<footer class="container"><hr/><p class="text-center">Desarrollado con AngularJS by Google. Por Alberto Basalo - <a href="http://agorabinaria.com">Ágora Binaria SL</a></p></footer>'
        };
    };

    function cabecera() {
        return {
            restrict: 'AE',
            replace: 'true',
            transclude: true,
            templateUrl: '/static/directivas/tpl-cabecera.html'
        };
    };

    function filaMovimiento() {
        return {
            restrict: 'A',
            templateUrl: '/static/directivas/tpl-fila-movimiento.html',
            scope: {
                movimientoplantilla: "=movimientodirectiva"
            }
        };
    }

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

    function plugin() {
        return {
            link: function (scope, element, attrs) {
                var init = scope.$eval(attrs.ngModel);
                var min = scope.$eval(attrs.abSliderMin);
                var max = scope.$eval(attrs.abSliderMax);
                $(element).plugin({
                    value: init,
                    min: min,
                    max: max,
                    tooltip: 'hide'
                });

                scope.$watch(attrs.ngModel, function (valor) {
                    $(element).plugin('setValue', valor);
                });

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