function GroupService(GroupModel) {
    let service = {
        create,
        findAll,
        findById,
        update,
        removeById

    };

    function create(values) {
        let newGroup = GroupModel(values);
        return save(newGroup);
    }

    function save(newGroup) {
        return new Promise(function (resolve, reject) {
            // do a thing, possibly async, then...
            newGroup.save(function (err) {
                if (err) reject(err);

                resolve('Group created!');
            });
        });
    }

    function findAll() {
        return new Promise(function (resolve, reject) {
            GroupModel.find({}, function (err, users) {
                if (err) reject(err);
                // object for all users
                resolve(users);
            });
        });
    }

    function findById(id) {
        return new Promise(function (resolve, reject) {
            GroupModel.findById(id, function (err, users) {
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
            GroupModel.findByIdAndUpdate(id, values, function (err, user) {
                if (err)  reject(err);
                
                resolve(user);
            });
        });
    }

    function removeById(id) {
        return new Promise(function (resolve, reject) {
            // do a thing, possibly async, then...
            console.log(id);
            GroupModel.findByIdAndRemove(id, function (err) {
                console.log(err);
                if (err) reject(err);
                resolve();
            });
        });
    }

    return service;
}

module.exports = GroupService;