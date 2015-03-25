// Dispondremos de tantos controladores como queramos
// Cada uno en su fichero
(function () {
    // Los controladores pueden tener dependencias de otras funciones
    // En este caso depende de $location, un servicio propio de angular que permite trabajar con urls
    function menuCtrl ($location) {
        // creamos una función anónima que recibe una ruta y la compara con la ruta actual
        this.isActive = function (ruta) {
            // Con esto deteminamos si una ruta es o no la actual
            return ruta === $location.path();
        }
    }
    // Se enlaza el controlador al módulo principal de la aplicación
    angular.module('controlCajaApp').controller('MenuCtrl',menuCtrl);
}());