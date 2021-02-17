function ItemService(ItemModel) {
    let service = {
        create,
        findAll,
        findById,
        update,
        removeById

    };

    function create(values) {
        let newItem = ItemModel(values);
        return save(newItem);
    }

    function save(newItem) {
        return new Promise(function (resolve, reject) {
            // do a thing, possibly async, then...
            newItem.save(function (err) {
                if (err) reject(err);

                resolve('Item created!');
            });
        });
    }

    function findAll() {
        return new Promise(function (resolve, reject) {
            ItemModel.find({}, function (err, users) {
                if (err) reject(err);
                // object for all users
                resolve(users);
            });
        });
    }

    function findById(id) {
        return new Promise(function (resolve, reject) {
            ItemModel.findById(id, function (err, users) {
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
            ItemModel.findByIdAndUpdate(id, values, function (err, user) {
                if (err)  reject(err);
                
                resolve(user);
            });
        });
    }

    function removeById(id) {
        return new Promise(function (resolve, reject) {
            // do a thing, possibly async, then...
            console.log(id);
            ItemModel.findByIdAndRemove(id, function (err) {
                console.log(err);
                if (err) reject(err);
                resolve();
            });
        });
    }

    return service;
}

module.exports = ItemService;