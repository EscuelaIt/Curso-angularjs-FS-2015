var io;
module.exports.initIO = function (app) {
	
    var server = require('http').Server(app);
    io = require('socket.io')(server);

    function conectar(socket) {
        console.log("IN: conectado!!!" + socket.client.conn.remoteAddress);
        var saludo = {
            serverPid: process.pid,
            date: new Date()
        };
        socket.emit('wellcome', saludo);
        socket.on('ackClient', function (data) {
            console.log("IN: mensaje: " + data);
            socket.emit('ackServer', data);
        });
    }
    io.on("connect", conectar);


    // Devolvemos el servidor http que hay bajo express y un puntero a una función para emitir mensajes
    return {
        server: server,
        emitter: emitirCanalMensaje
    };
}


function emitirCanalMensaje(canal, mensaje) {
    console.log("OUT: " + canal + ' : ' +JSON.stringify(mensaje));
    io.sockets.emit(canal, mensaje);
}