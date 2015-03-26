(function () {
    // La factoria ya no almacenrá sus propios datos
    // Mediante el servicio $http hará las llamadas al servidor
    // Es un servicio core y no hay que referenciar ningún módulo extra
    var movimientosFactory =   function ($http)  {

        var urlBase = "http://localhost:3000/api/";


        var factory  =   {};


        // se produce un cambio en la nomenclatura
        // al usar el gerundio indicamos un proceso no terminado
        // el controlador que lo consuma debe manejar la promesa
        factory.gettingMovimientos =   function ()  {
            // Estamos devolviendo promesas, no objetos
            return $http.get(urlBase + 'priv/movimientos');
        };

        factory.gettingTotal =   function ()  {
            return $http.get(urlBase + 'priv/total');
        };
        factory.postingMovimiento =   function (movimiento)  {
            return $http.post(urlBase + 'priv/movimientos', movimiento);
        };


        //La poca lógica de negocio se irá al lado del servidor
        //        factory.postMovimiento =   function (movimiento)  {
        //            movimientos.push(movimiento);
        //            total.ingresos += movimiento.esIngreso * movimiento.importe;
        //            total.gastos += movimiento.esGasto * movimiento.importe;
        //        };

        return factory;
    };

    angular.module('controlCajaApp').factory('movimientosFactory', movimientosFactory);
}());