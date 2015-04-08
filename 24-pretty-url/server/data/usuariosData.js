var mongodb = require('./mongodb.js')
var mongoCol = "usuarios"

exports.findingByEmail = function (email) {
	return mongodb.finding(mongoCol, {
		email: email
	});
}

exports.findingByEmailPassword = function (email, password) {
	return mongodb.finding(mongoCol, {
		email: email,
		password: password
	});
}

exports.inserting = function (usuario) {
	return mongodb.inserting(mongoCol, usuario);
}

exports.updating = function (usuario) {
	return mongodb.updating(mongoCol, {
			email: usuario.email
		},
		usuario);
}

