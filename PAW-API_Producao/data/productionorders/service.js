const Item = require('../items/item');
const Production=require('./productionorder');

function ProductionService(ProdModel) {
    let service = {
        create,
        findAll,
        findById,
        update,
        removeById
    };

    function create(values) {
        let newProd = ProdModel(values);
        return save(newProd);
    }

    function save(newProd) {
        return new Promise(function (resolve, reject) {
            // do a thing, possibly async, then...
            newProd.save(function (err) {
                if (err) reject(err);

                resolve('Production order created!');
            });
        });
    }

    function findAll() {
        return new Promise(function (resolve, reject) {
            ProdModel.find({}, function (err, users) {
                if (err) reject(err);
                // object for all users
                resolve(users);
            });
        });
    }

    function findById(id) {
        return new Promise(function (resolve, reject) {
            ProdModel.findById(id, function (err, users) {
                if (err) reject(err);
                // object for all the users
                resolve(users);
            });
        });
    }

    function update(id, values) {
        return new Promise(function (resolve, reject) {
            // do a thing, possibly async, then...
            // values - {name: jose} || {lastName: Jose} || {name: j, lastName: g}
            ProdModel.findByIdAndUpdate(id, values, function (err, user) {
                if (err)  reject(err);
                
                resolve(user);
            });
        });
    }

    function removeById(id) {
        return new Promise(function (resolve, reject) {
            // do a thing, possibly async, then...
            console.log(id);
            ProdModel.findByIdAndRemove(id, function (err) {
                console.log(err);
                if (err) reject(err);
                resolve();
            });
        });
    }

    return service;
}

module.exports = ProductionService