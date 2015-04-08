var app = require('./server/config.js').configApp();
require('./server/seguridad.js').seguridad(app);
console.log('ready');

require('./server/maestros.js').routeMaestros(app);
require('./server/movimientos.js').routeMovimientos(app);
console.log('steady');



app.listen(3000);
console.log('go');