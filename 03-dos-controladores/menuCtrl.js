// Dispondremos de tantos controladores como queramos
// Cada uno en su fichero
(function () {
    // Los controladores pueden tener dependencias de otras funciones
    // En este caso depende de un servicio propio de angular que permite trabajar con urls
    function menuCtrl ($location) {
        // creamos una función anónima que recibe una ruta y la compara con la ruta actual
        this.isActive = function (ruta) {
            return ruta === $location.path();
        }
    }
    angular.module('controlCajaApp').controller('MenuCtrl',menuCtrl);
}());