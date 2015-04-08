var app = require('./server/config.js').configApp();
var socket = require('./server/socket.js').initIO(app);
require('./server/seguridad.js').seguridad(app);
console.log('ready');

require('./server/maestros.js').routeMaestros(app);
require('./server/movimientos.js').routeMovimientos(app, socket.emitter);
console.log('steady');


// El encargado de escuchar es el servicio http, en lugar de express
// Esto se hace para soportar las llamadas desde socket.io
socket.server.listen(3000);
console.log('go');