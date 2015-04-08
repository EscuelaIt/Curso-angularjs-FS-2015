var Q = require('q');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongoUrl = "mongodb://localhost:27017/control_caja";

exports.connecting = function (mongoCol) {
    var deferred = Q.defer();
    MongoClient.connect(mongoUrl, function (err, db) {
        if (!err) {
            deferred.resolve(db.collection(mongoCol));
        } else {
            rejectOnError(deferred, err);
        }
    });
    return deferred.promise;
}

exports.ObjectId = 	mongodb.ObjectID;

exports.rejectOnError = rejectOnError;

function rejectOnError(deferred, err) {
    console.error(err);
    deferred.reject(err);
}