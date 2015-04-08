(function () {

    var movimientosFactory =   function ($resource)  {

        var factory  =   {};
        factory.movimientos =  $resource("/api/priv/movimientos/:id", {
            id: "@id"
        })
        factory.total = $resource("/api/priv/total/");

        return factory;
    };

    angular.module('controlCajaApp').factory('movimientosFactory', movimientosFactory);
}());