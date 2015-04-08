var Q = require('q');
var mongodb = require('./mongodb.js')
var mongoCol = "usuarios"

exports.gettingByEmail = function (email) {
    var deferred = Q.defer();
    mongodb.connecting(mongoCol)
        .then(function (colDb) {
            colDb.find({
                email: email
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

exports.gettingByEmailPassword = function (email, password) {
    var deferred = Q.defer();
    mongodb.connecting(mongoCol)
        .then(function (colDb) {
            colDb.find({
                email: email,
                password: password
            }).toArray(function (err, result) {
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

exports.posting = function (usuario) {
    var deferred = Q.defer();
    mongodb.connecting(mongoCol)
        .then(function (colDb) {
            colDb.insert(usuario, function (err, result) {
                if (err) {
                    rejectOnError(deferred, err);
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

exports.updatingTotal = function (movimiento) {
    var deferred = Q.defer();
    mongodb.connecting(mongoCol)
        .then(function (colDb) {
            colDb.find({
                email: movimiento.usuario
            }).toArray(function (err, result) {
                if (err) {
                    mongodb.rejectOnError(deferred, err);
                } else {
                    if (result && result[0]) {
                        var usuario = result[0];
                        if (usuario.total === undefined) {
                            usuario.total = {
                                ingresos: 0,
                                gastos: 0
                            };
                        }
                        if (movimiento.tipo == 'Ingreso') {
                            usuario.total.ingresos += movimiento.importe;
                        } else {
                            usuario.total.gastos += movimiento.importe;
                        }
                        colDb.update({
                            email: movimiento.usuario
                        }, usuario, function (err, data) {
                            if (err) {
                                rejectOnError(deferred, err);
                            } else {
                                deferred.resolve(result[0]);
                            }
                        });
                    } else {
                        mongodb.rejectOnError(deferred, "Sin usuario");
                    }
                }
            });
        })
        .fail(function (err) {
            mongodb.rejectOnError(deferred, err);
        });
    return deferred.promise;
}