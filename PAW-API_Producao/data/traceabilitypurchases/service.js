function TraceabilityPurchaseService(TraceabilityPurchaseModel) {
    let service = {
        create,
        findAll,
        findById,
        update,
        removeById

    };

    function create(values) {
        let newTraceabilityPurchase = TraceabilityPurchaseModel(values);
        return save(newTraceabilityPurchase);
    }

    function save(newTraceabilityPurchase) {
        return new Promise(function (resolve, reject) {
            // do a thing, possibly async, then...
            newTraceabilityPurchase.save(function (err) {
                if (err) reject(err);

                resolve('Traceability Purchase created!');
            });
        });
    }

    function findAll() {
        return new Promise(function (resolve, reject) {
            TraceabilityPurchaseModel.find({}, function (err, users) {
                if (err) reject(err);
                // object for all users
                resolve(users);
            });
        });
    }

    function findById(id) {
        return new Promise(function (resolve, reject) {
            TraceabilityPurchaseModel.findById(id, function (err, users) {
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
            TraceabilityPurchaseModel.findByIdAndUpdate(id, values, function (err, user) {
                if (err)  reject(err);
                
                resolve(user);
            });
        });
    }

    function removeById(id) {
        return new Promise(function (resolve, reject) {
            // do a thing, possibly async, then...
            console.log(id);
            TraceabilityPurchase.findByIdAndRemove(id, function (err) {
                console.log(err);
                if (err) reject(err);
                resolve();
            });
        });
    }

    return service;
}

module.exports = TraceabilityPurchaseService;