var Q = require('q');
var mondodb = require('mongodb');
var MongoClient = mondodb.MongoClient;
var mongoUrl = "mongodb://localhost:27017/control_caja";

exports.ObjectId = mondodb.ObjectID;
exports.connecting = connecting;
exports.finding = finding;
exports.inserting = inserting;
exports.updating = updating;

function connecting(mongoCol) {
	var deferred = Q.defer();
	MongoClient.connect(mongoUrl, function (err, db) {
		if (err) {
			callback2Promise(err, null, deferred);
		} else {
			callback2Promise(null, db.collection(mongoCol), deferred);
		}
	});
	return deferred.promise;
}

function finding(mongoCol, query) {
	var deferred = Q.defer();
	connecting(mongoCol)
		.then(function (colDb) {
			colDb.find(query).toArray(function (err, result) {
				callback2Promise(err, result, deferred);
			});
		})
		.fail(function (err) {
			callback2Promise(err, result, deferred);
		});
	return deferred.promise;
}

function inserting(mongoCol, document) {
	var deferred = Q.defer();
	connecting(mongoCol)
		.then(function (colDb) {
			colDb.insert(document, function (err, result) {
				callback2Promise(err, result, deferred);
			});
		})
		.fail(function (err) {
			callback2Promise(err, result, deferred);
		});
	return deferred.promise;
}

function updating(mongoCol, query, document) {
	var deferred = Q.defer();
	connecting(mongoCol)
		.then(function (colDb) {
			colDb.update(query, document, function (err, result) {
				callback2Promise(err, result, deferred);
			});
		})
		.fail(function (err) {
			callback2Promise(err, result, deferred);
		});
	return deferred.promise;
}

function callback2Promise(err, result, deferred) {
	if (err) {
		console.error(err);
		deferred.reject(err);
	} else {
		deferred.resolve(result);
	}
}