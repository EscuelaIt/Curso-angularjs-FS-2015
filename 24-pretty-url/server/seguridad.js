var usuariosData = require('./data/usuariosData.js')
var sesiones = [];

module.exports.seguridad = function (app) {

	app.use('/api/priv/', function (req, res, next) {
		var sessionId = req.get('sessionId');
		var sesion = getSesion(sessionId);
		if (sesion) {
			if (esSesionValida(sesion)) {
				sesion.timeStamp = new Date();
				req.usuario = sesion.email;
				next();
			} else {
				console.log('Sesión caducada:' + JSON.stringify(sesion));
				res.status(419).send('Sesión caducada');
			}
		} else {
			res.status(401).send('Credencial inválida');
		}
	});
	// API - REST 
	// SECURITY
	app.route('/api/usuarios')
		.post(function (req, res, next) {
			var usuario = req.body;
			usuariosData.findingByEmail(usuario.email)
				.then(function (data) {
					if (data[0]) {
						console.log('email ya registrado:' + usuario.email);
						res.status(409).send('email ' + usuario.email + ' ya registrado');
					} else {
						console.log('registrando:' + usuario.email);
						usuariosData.inserting(usuario)
							.then(function (data) {
								res.json(newSession(usuario.email));
							});
					};
				})
				.fail(function (err) {
					res.status(500).send(err);
				});
		});

	app.route('/api/sesiones')
		.post(function (req, res, next) {
			var usuario = req.body;
			usuariosData.findingByEmailPassword(usuario.email, usuario.password)
				.then(function (data) {
					if (data) {
						console.log('aceptado:' + usuario.email);
						res.json(newSession(usuario.email));
					} else {
						console.log('Credencial inválida:' + usuario.email);
						res.status(401).send('Credencial inválida');
					}
				})
				.fail(function (err) {
					res.status(500).send(err);
				});
		});

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

}