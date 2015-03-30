var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());
app.use(express.static(__dirname + '/client'));

console.log('ready');

var movimientos = [];

var totales = [];

var usuarios = [];
var sesiones = [];

app.use('/api/priv/', function (req, res, next) {
    var sessionId = req.get('sessionId');
    var sesion = getSesion(sessionId);
    if (sesion) {
        if (esSesionValida(sesion)) {
            sesion.timeStamp = new Date();
            req.usuario = sesion.email;
        } else {
            console.log('Sesión caducada:' + JSON.stringify(sesion));
            res.send(419, 'Sesión caducada');
        }
    } else {
        res.send(401, 'Credencial inválida');
    }
    next();
});





// API - REST 
// SECURITY
app.route('/api/usuarios')
    .get(function (req, res, next) {
        // Esto devuelve la lista completa de usuarios y contraseñas
        // PELIGRO: Usar sólo a modo de debug mientras desarrollamos
        res.json(usuarios);
    })
    .post(function (req, res, next) {
        var usuario = req.body;
        if (existeUsuario(usuario)) {
            console.log('email ya registrado:' + usuario.email);
            res.send(409, 'email ' + usuario.email + ' ya registrado');
        } else {
            console.log('registrado:' + usuario.email);
            usuarios.push(usuario);
            res.json(newSession(usuario.email));
        }
    });

app.route('/api/sesiones')
    .get(function (req, res, next) {
        // Esto devuelve la lista completa de sesiones
        // PELIGRO: Usar sólo a modo de debug mientras desarrollamos    
        res.json(sesiones);
    })
    .post(function (req, res, next) {
        var usuario = req.body;
        if (esUsuarioValido(usuario)) {
            console.log('aceptado:' + usuario.email);
            res.json(newSession(usuario.email));
        } else {
            console.log('Credencial inválida:' + usuario.email);
            res.send(401, 'Credencial inválida');
        }
    });

function existeUsuario(usuario) {
    return usuarios.some(function (u) {
        return u.email == usuario.email;
    });
}

function esUsuarioValido(usuario) {
    return usuarios.filter(function (u) {
        return u.email == usuario.email && u.password == usuario.password;
    })[0];
}

function getSesion(sessionId) {
    return sesiones.filter(function (s) {
        return s.sessionId == sessionId;
    })[0]
}

function esSesionValida(sesion) {
    return (new Date() - sesion.timeStamp) < 20 * 60 * 1000;
}

function newSession(email) {
    var sessionId = Math.random() * (88888) + 11111;
    var timeStamp = new Date();
    sesiones.push({
        sessionId: sessionId,
        email: email,
        timeStamp: timeStamp
    });
    return sessionId;
}


// BUSINESS
app.get('/api/pub/maestros', function (req, res, next) {
    var maestros = {
        categoriasIngresos: ['Nómina', 'Ventas', 'Intereses Depósitos'],
        categoriasGastos: ['Hipotéca', 'Compras', 'Impuestos']
    };
    res.json(maestros);
});

app.route('/api/priv/movimientos')
    .get(function (req, res, next) {
        console.log(JSON.stringify(movimientos));
		var movimientosUsuario = movimientos.filter(function (m) {
            return m.usuario == req.usuario;
        });
        res.json(movimientosUsuario);
    })
    .post(function (req, res, next) {
        var movimiento = req.body;
        movimiento.usuario = req.usuario;
        movimientos.push(movimiento);
        var totalUsuario = getTotalUsuario(req.usuario);
        if (movimiento.tipo == 'Ingreso')
            totalUsuario.ingresos += movimiento.importe;
        else
            totalUsuario.gastos += movimiento.importe;
        res.status(200).send();
    });

function getTotalUsuario(usuario) {
    if(usuario===undefined) return {};
    var totalUsuario = totales.filter(function (t) {
        return t.usuario == usuario;
    })[0];
    if (totalUsuario===undefined) {
        totalUsuario = {
            usuario : usuario,
            ingresos: 0,
            gastos: 0
        };
        totales.push(totalUsuario);
    }
    return totalUsuario;
}

app.get('/api/priv/total', function (req, res, next) {
    var totalUsuario = getTotalUsuario(req.usuario);
    res.json(totalUsuario);
});


console.log('steady');
app.listen(3000);
console.log('go');