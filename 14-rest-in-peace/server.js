var express = require('express');
var bodyParser = require('body-parser');

// Configuración de la aplicación express
var app = express();
app.use(bodyParser());
app.use(express.static(__dirname + '/client'));

console.log('ready');

// Variables locales en las que almacenar la información
// En el futuro estrán en MongoDB
var movimientos = [];
var total = {
    ingresos: 0,
    gastos: 0
}

// API - REST 
// verbos en protocolo, nombres de recurso en la ruta, parametros en segmentos o body

// ruta en el API que devolverá la lista de maestros
app.get('/api/pub/maestros', function (req, res, next) {
    var maestros = {
        categoriasIngresos: ['Nómina', 'Ventas', 'Intereses Depósitos'],
        categoriasGastos: ['Hipotéca', 'Compras', 'Impuestos']
    };
    // la comunicación será siempre vía JSON
    res.json(maestros);
});


// Si para una misma ruta hay más de un verbo
// Podemos tener rutas para enviar y recibir datos con los verbos htttp get y post
app.route('/api/priv/movimientos')
    .get(function (req, res, next) {
        res.json(movimientos);
    })
    .post(function (req, res, next) {
        var movimiento = req.body;
        console.log(JSON.stringify(movimiento));
        movimientos.push(movimiento);
        // La lógica de negocio se viene al lado del servidor
        if (movimiento.tipo == 'Ingreso')
            total.ingresos += movimiento.importe;
        else
            total.gastos += movimiento.importe;
        res.status(200).send();
    });

// En esta ruta devolveremos un objeto con los totales agrupados
app.get('/api/priv/total', function (req, res, next) {
    res.json(total);
});


console.log('steady');
app.listen(3000);
console.log('go');