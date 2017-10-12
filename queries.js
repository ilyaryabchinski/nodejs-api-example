var promise = require('bluebird');
var options = {
    promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:myPassword@localhost:5432/drivers';

var db = pgp(connectionString);

function getAllDrivers(req, res, next) {
    db.any('select * from drivers')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL drivers'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSingleDriver(req, res, next) {
    var driverID = parseInt(req.params.id);
    db.one('select * from drivers where id = $1', driverID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE driver'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createDriver(req, res, next) {
    db.none('insert into drivers(name, number, car)' +
        'values(${name}, ${number}, ${car})',
        req.body)
        .then(function () {
            res.status(201)
                .json({
                    status: 'success',
                    message: 'Inserted one driver'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


function updateDriver(req, res, next) {
    db.none('update drivers set name=$1, number=$2, car=$3 where id=$4',
        [req.body.name, req.body.number,req.body.car, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated driver'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


function removeDriver(req, res, next) {
    var driverID = parseInt(req.params.id);
    db.result('delete from drivers where id = $1', driverID)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

module.exports = {
    getAllDrivers: getAllDrivers,
    getSingleDriver: getSingleDriver,
    createDriver: createDriver,
    updateDriver: updateDriver,
    removeDriver: removeDriver
};