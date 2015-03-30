(function () {

    var movimientosFactory =   function ($resource)  {

        var factory  =   {};

        // $resource("/api/priv/movimientos/");
        // El uso de parametros en los recursos debe especificarse
        // Indicando el nombre local y el remoto
        // En la url va el nombre remoto
        // En el objeto se repute ese nombre como clave y se dice que propiedad será la que lo lleve
        // La propiedad empieza por @
        factory.movimientos =  $resource("/api/priv/movimientos/:id", {
            id: "@id"
        })



        factory.total = $resource("/api/priv/total/");

        return factory;
    };

    angular.module('controlCajaApp').factory('movimientosFactory', movimientosFactory);
}());