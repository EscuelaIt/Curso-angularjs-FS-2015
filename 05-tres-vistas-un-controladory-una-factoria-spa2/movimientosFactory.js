(function () {
    // Las factorías, y los servicios, son funciones estándar
    // Una gran diferencia con los controladores es que son singleton
    // Eso los convierte en un buen lugar para compartir datos
    var movimientosFactory =   function ()  {
        // el array de movimientos y el total lo mantiene la factoría
        // de esta forma sobrevive a las recargas de controladores
        var movimientos = [];
        // Normalmente estos datos se persisten en servidores remotos
        // o al menos se almacenan en el browser
        var total = {
            ingresos: 0,
            gastos: 0
        };

        // las factorias siempre devuelven objetos (en este caso le llamo factory)
        // Estos objetos pueden contener funciones de lógica reutilizables
        
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
        // Exponemos funionalidad devolviendo el objeto creado, 
        // para que el cliente explote sus métodos 
        return factory;
    };
    
    // se registran dentro de un módulo con la palabra clave factory
    angular.module('controlCajaApp').factory('movimientosFactory', movimientosFactory);
}());

