var mongodb = require('./mongodb.js')
var mongoCol = "movimientos"

exports.findingByUsuario = function (usuario) {
	return mongodb.finding(mongoCol, {
		usuario: usuario
	});
}

exports.inserting = function (movimiento) {
	return mongodb.inserting(mongoCol, movimiento);
}

exports.findingByIdUsuario = function (_id, usuario) {
	return mongodb.finding(mongoCol, {
		_id: new mongodb.ObjectId(_id),
		usuario: usuario
	});
}