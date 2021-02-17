let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
const User = require('./user');
//const { JsonWebTokenError } = require("jsonwebtoken");

function UserService(UserModel) {
    let service = {
        create,
        createToken,
        verifyToken,
        findUser,
        createPassword,
        comparePassword,
        autorize,
        authUser
    };

    function authUser(req, res, next){
        if(req.user==null){
            res.status(403)
            return res.send('You need to sign in')
        }
    }

    function create(user) {
        return createPassword(user)
        .then((hashPassword, err) => {
            if(err) {
                return Promise.reject("Not saved");
            }

            let newUserWithPassword = {
                ...user,
                password: hashPassword,
            }

            let newUser = UserModel(newUserWithPassword);
            return save(newUser);
        });

    }

    /*
    function create(values) {
        let newUser = UserModel(values);
        return save(newUser);
    }
*/

    function save(model) {
        return new Promise(function (resolve, reject) {
            // do a thing, possibly async, then...
            model.save(function (err) {
                console.log(err);
                if (err) reject("There is a problem with register");

                resolve("User created!");
            });
        });
    }

    return service;

}


function createToken(user) {
    let token = jwt.sign({ id: user._id }, 'superscret', {
        expiresIn: 86400
    });

    return { auth: true, token }
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'superscret', (err, decoded) => {
            if (err) {
                reject();
            }
            return resolve(decoded);
        })
    })
}

function findUser({ name, password }) {
    return new Promise(function (resolve, reject) {
        User.findOne({ name}, function (err, user) {
            if (err) reject (err);
            // Object of all the users

            if(!user) {
                reject("This data is wrong");
            }
            resolve(user);
        });
    })
    .then((user) => {
        return comparePassword(password, user.password)
        .then((match) => {
            if(!match) return Promise.reject("User not valid");
            
            return Promise.resolve(user);
        })
    })
}

/*
function findUser({ name, password }) {
    return new Promise(function (resolve, reject) {
        UserModel.findOne({ name, password }, function (err, user) {
            if (err) reject(err);
            // Object of all the users

            if (!user) {
                reject("This data is wrong");
            }
            resolve(user);
        });
    });
}
*/

// Return password encrypted
function createPassword(user) {
    return bcrypt.hash(user.password, 10);
}

// Return true or false if the same password 
// function comparePassword(password, hash) {
//     return bcrypt.compare(password, hash);
// }

function comparePassword(candidatepassword, checkpassword) {
    return bcrypt.compare(candidatepassword, this.password, function(err,isMatch){
        if(err) return checkpassword(err)
        checkpassword(null, isMatch)
    });
}

function autorize(scopes){
    return(request,response,next)=>{
        const {roleUser}=request;

        const hasAutorization=scopes.some(scopes=>roleUser.includes(scope));
        
        if(roleUser && hasAutorization){
            next();
        }else{
            response.status(403).json({message:"Forbidden"});
        }
    }
}

module.exports = UserService;