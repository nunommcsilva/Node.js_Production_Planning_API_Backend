const bodyParser = require('body-parser');
const express = require('express');
const Users = require('../data/users');
const User = require('../data/users/user');
let bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

function AuthRouter() {
    let router = express();

    router.use(bodyParser.json({ limit: '100mb' }));
    router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));    

    router.route('/register')
        .post(function (req, res, next) {
            const body = req.body;

            Users.create(body)
                .then((user) => Users.createToken(user))
                .then((response) => {
                    res.status(200);
                    res.send(response);
                })
                .catch((err) => {
                    res.status(500);
                    res.send(err);
                    next();
                });
        });


        router.route('/me')
        .get(function(req, res, next) {
            let token = req.headers['x-access-token'];

            if(!token) {
                return res.status(401).send({ auth: false, message: 'No token provided.'})
            }
            return Users.verifyToken(token)
            .then((decoded) => {
                res.status(202).send({ auth: true, decoded});
            })
            .catch((err) => {
                res.status(500);
                res.send(err);
                next();
            });
        });

// Verify this function!!!
        router.route('/login')
        .post(function(req, res, next){
            // User.findOne({name:req.body.name}).then(
            //     (user)=>{
            //         if(!user)
            //     }
            // )
            User.findOne({name:req.body.name}).then(
                (user)=>{
                    if(!user){
                        return res.status(401).json({
                            message:'User not found!'
                        });
                    }
                    bcrypt.compare(req.body.password, user.password).then(
                        (valid)=>{
                            if(!valid){
                                return res.status(401).json({
                                    message:'Incorrect password!'
                                });
                            }   
                            const token=jwt.sign(
                                {userId:user._id},
                                'RANDOM_TOKEN_SECRET',
                                {expiresIn:'24h'});
                            res.status(200).json({
                                userId:user._id,
                                token:token,
                                role:user.role.name
                            });
                        }
                    ).catch(
                        (error)=>{
                            res.status(500).json({
                                message:'SERVER ERROR1'
                            });
                        }
                    );
                }
            ).catch(
                (error)=>{
                    res.status(500).json({
                        message:'SERVER ERROR2'
                    });
                }
            );
        });

        router.route('/changepassword')
            .post(function(req,res){
                let name = req.body.name;
                let password = req.body.oldPassword;
                let newPassword=req.body.newPassword

                User.findOne({name}).then(
                    (user)=>{   
                        if(!user){
                            return res.status(401).json({
                                message:'User not found!'
                            });
                        }
                        bcrypt.compare(password, user.password).then(
                            (valid)=>{
                                if(!valid){
                                    return res.status(401).json({
                                        message:'Incorrect password!'
                                    });
                                }
                                var query = {name: user.name};
                                bcrypt.genSalt(10, function(err, salt){
                                    bcrypt.hash(newPassword, salt, function(err, hash){
                                        if (err) throw err;
                                        else{
                                            user.password = hash;                                            
                                            User.findOneAndUpdate(query, { $set: { password: user.password }}, {new: true}, function(err, newUser){
                                                if(err) throw err;
                                                else{
                                                    bcrypt.compare(newPassword, newUser.password, function(err, isMatch){
                                                        if(err) throw err;
                                                        console.log(isMatch);
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }); 
                            }
                        )
                    }
                )
            });
        return router;
}

module.exports = AuthRouter;