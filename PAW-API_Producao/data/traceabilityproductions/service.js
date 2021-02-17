function TraceabilityProductionService(TraceabilityProductionModel) {
    let service = {
        create,
        findAll,
        findById,
        update,
        removeById

    };

    function create(values) {
        let newTraceabilityProduction = TraceabilityProductionModel(values);
        return save(newTraceabilityProduction);
    }

    function save(newTraceabilityProduction) {
        return new Promise(function (resolve, reject) {
            // do a thing, possibly async, then...
            newTraceabilityProduction.save(function (err) {
                if (err) reject(err);

                resolve('Traceability Production created!');
            });
        });
    }

    function findAll() {
        return new Promise(function (resolve, reject) {
            TraceabilityProductionModel.find({}, function (err, users) {
                if (err) reject(err);
                // object for all users
                resolve(users);
            });
        });
    }

    function findById(id) {
        return new Promise(function (resolve, reject) {
            TraceabilityProductionModel.findById(id, function (err, users) {
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
            TraceabilityProductionModel.findByIdAndUpdate(id, values, function (err, user) {
                if (err)  reject(err);
                
                resolve(user);
            });
        });
    }

    function removeById(id) {
        return new Promise(function (resolve, reject) {
            // do a thing, possibly async, then...
            console.log(id);
            TraceabilityProduction.findByIdAndRemove(id, function (err) {
                console.log(err);
                if (err) reject(err);
                resolve();
            });
        });
    }

    return service;
}

module.exports = TraceabilityProductionService;