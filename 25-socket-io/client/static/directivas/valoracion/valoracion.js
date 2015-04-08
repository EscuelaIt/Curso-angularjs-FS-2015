(function () {
    var valoracion = function () {
        return {
            restrict: 'AE',
            templateUrl: '/static/directivas/valoracion/tpl-valoracion.html',
            scope: {
                valor: '=',
                max: '@',
                soloLectura: '@'
            },
            link: function (scope, elem, attrs) { 
                function actualizar() {
					if(!scope.valor)scope.valor=1;
					scope.estrellas = [];
                    for (var i = 0; i < scope.max; i++) {
                        var estrella = {
                            marcada: (i < scope.valor)
                        };
                        scope.estrellas.push(estrella);
                    }
                };

                scope.marcar = function (indice) {
                    if (scope.soloLectura && scope.soloLectura === 'true') {
                        return;
                    }
                    scope.valor = indice + 1;
                    actualizar();
                };
                actualizar();
            }
        }
    }

    angular.module('abDirectivas')
        .directive('abValoracion', valoracion);

}());