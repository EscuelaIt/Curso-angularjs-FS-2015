var usuarios = [];
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
		.get(function (req, res, next) {
			// Esto devuelve la lista completa de usuarios y contraseñas
			// PELIGRO: Usar sólo a modo de debug mientras desarrollamos
			res.json(usuarios);
		})
		.post(function (req, res, next) {
			var usuario = req.body;
			if (existeUsuario(usuario)) {
				console.log('email ya registrado:' + usuario.email);
				res.status(409).send('email ' + usuario.email + ' ya registrado');
			} else {
				console.log('registrado:' + usuario.email);
				usuarios.push(usuario);
				res.json(newSession(usuario.email));
			}
		});

	// Gestión de sesiones: listado y login
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
				res.status(401).send('Credencial inválida');
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


}