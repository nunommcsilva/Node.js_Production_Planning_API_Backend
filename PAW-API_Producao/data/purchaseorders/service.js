function PurchaseService(PurchaseModel) {
    let service = {
        create,
        findAll,
        findById,
        update,
        removeById

    };

    function create(values) {
        let newPurchase = PurchaseModel(values);
        return save(newPurchase);
    }

    function save(newPurchase) {
        return new Promise(function (resolve, reject) {
            // do a thing, possibly async, then...
            newPurchase.save(function (err) {
                if (err) reject(err);

                resolve('Purchase order created!');
            });
        });
    }

    function findAll() {
        return new Promise(function (resolve, reject) {
            PurchaseModel.find({}, function (err, users) {
                if (err) reject(err);
                // object for all users
                resolve(users);
            });
        });
    }

    function findById(id) {
        return new Promise(function (resolve, reject) {
            PurchaseModel.findById(id, function (err, users) {
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
            PurchaseModel.findByIdAndUpdate(id, values, function (err, user) {
                if (err)  reject(err);
                
                resolve(user);
            });
        });
    }

    function removeById(id) {
        return new Promise(function (resolve, reject) {
            // do a thing, possibly async, then...
            console.log(id);
            PurchaseModel.findByIdAndRemove(id, function (err) {
                console.log(err);
                if (err) reject(err);
                resolve();
            });
        });
    }

    return service;
}

module.exports = PurchaseService;