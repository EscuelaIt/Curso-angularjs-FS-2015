(function () {
    var movimientosFactory =   function ()  {
        var movimientos = [];
        var total = {
            ingresos: 0,
            gastos: 0
        };

        
        var factory  =   {};
        factory.getMovimientos =   function ()  {
            return movimientos;
        };
        factory.getTotal =   function ()  {
            return total;
        };
        factory.postMovimiento =   function (movimiento)  {
            movimientos.push(movimiento);
            total.ingresos += movimiento.esIngreso * movimiento.importe;
            total.gastos += movimiento.esGasto * movimiento.importe;
        };
        return factory;
    };

    angular.module('controlCajaApp').factory('movimientosFactory', movimientosFactory);
}());

