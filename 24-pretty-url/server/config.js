module.exports.configApp = function () {
    var path = require('path');
    var express = require('express');
    var bodyParser = require('body-parser');

    var app = express();


    app.use(function (peticion, respuesta, siguiente) {
        console.log("recibida petición: " + peticion.url);
        if (peticion.body && Object.keys(peticion.body).length > 0) {
            console.log("body: " + JSON.stringify(peticion.body));
        }
        siguiente();
    });
    app.use(bodyParser());

    // rewrites para que permita usar rutas sin #
    app.get('/*', function (req, res, next) {
        if ((req.url.indexOf("static/") >= 0) || (req.url.indexOf("api/") >= 0)) {
            next();
        } else {
            res.sendFile('./index.html', {
                root: path.join(__dirname, '../client')
            });
        }
    });
    app.use(express.static(__dirname + './../client'));


    return app;

}