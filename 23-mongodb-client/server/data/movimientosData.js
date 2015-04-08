var Q = require('q');
var mongodb = require('./mongodb.js')
var mongoCol = "movimientos"

exports.gettingByUsuario = function (usuario) {
	var deferred = Q.defer();
	mongodb.connecting(mongoCol)
		.then(function (colDb) {
			colDb
				.find({
					usuario: usuario
				})
				.toArray(function (err, result) {
					if (err) {
						mongodb.rejectOnError(deferred, err);
					} else {
						deferred.resolve(result);
					}
				});
		})
		.fail(function (err) {
			mongodb.rejectOnError(deferred, err);
		});
	return deferred.promise;
}

exports.posting = function (movimiento) {
	var deferred = Q.defer();
	mongodb.connecting(mongoCol)
		.then(function (colDb) {
			colDb.insert(movimiento, function (err, result) {
				if (err) {
					mongodb.rejectOnError(deferred, err);
				} else {
					deferred.resolve(result[0]);
				}
			});
		})
		.fail(function (err) {
			mongodb.rejectOnError(deferred, err);
		});
	return deferred.promise;
}

exports.gettingByIdUsuario = function (_id, usuario) {
	var deferred = Q.defer();
	mongodb.connecting(mongoCol)
		.then(function (colDb) {
			colDb.find({
				_id: new mongodb.ObjectId(_id),
				usuario: usuario
			}).toArray(function (err, result) {
				if (err) {
					mongodb.rejectOnError(deferred, err);
				} else {
					deferred.resolve(result[0]);
				}
			});
		})
		.fail(function (err) {
			mongodb.rejectOnError(deferred, err);
		});
	return deferred.promise;
}