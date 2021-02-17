const bodyParser = require('body-parser');
const express = require('express');
const Groups = require('../data/bomgroups');
const Group = require('../data/bomgroups/bomgroup');

const Users =require('../data/users');
let scopes=require('../data/users/scopes');

function GroupRouter() {
    let router = express();

    router.use(bodyParser.json({ limit: '100mb' }));
    router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    router.use(function (req, res, next) {
        console.log('Time:', Date.now())
        next();
    });
    

    router.route('/bomgroups')
        .get(function (req, res, next) {
            console.log('get all BOM groups');
            Groups.findAll()
                .then((groups) => {
                    res.send(groups);
                    next();
                })
                .catch((err) => {
                    next();
                })
        })

        .post(function (req, res, next) {
            console.log('post');
            let body = req.body;

            Groups.create(body)
                .then(() => {
                    console.log('saved');
                    res.status(200);
                    res.send(body);
                    next();
                })
                .catch((err) => {
                    console.log('It is not possible to save');
                    err.status = err.status || 500;
                    res.status(401);
                    next();
                });


        });
        
    router.route('/bomgroups/:groupId')
        .get(function (req, res, next) {
            console.log('get for one Id');
            let groupId = req.params.groupId;

            Groups.findById(groupId)
                .then((group) => {
                    res.status(200);
                    res.send(group);
                    next();
                })

                .catch((err) => {
                    res.status(404);
                    next();
                })
        })
        .put(function (req, res, next) {
            console.log('put for one Id');
            let groupId = req.params.groupId;
            let body = req.params.body;

            Groups.update(groupId, body)
                .then((group) => {
                    res.status(200);
                    res.send(group);
                    next();
                })
                .catch((err) => {
                    res.status(404);
                    next();
                });
        })
        .patch(getGroups, async(req,res)=>{
            if(req.body.name!=null){
                res.group.name=req.body.name
            }
            if(req.body.cost!=null){
                res.group.cost=req.body.cost
            }
            if(req.body.notes!=null){
                res.group.notes=req.body.notes
            }
            if(req.body.tags!=null){
                res.group.tags=req.body.tags
            }
            try {
                const updateGroup=await res.group.save();
                res.json(updateGroup)
            } catch (err) {
                res.status(400).json({message: err.message})
            }
        })
        .delete(function (req, res, next) {
            console.log('del for one Id');
            let groupId = req.params.groupId;
            Groups.removeById(groupId)
                .then(() => {
                    console.log('deleted');
                    res.status(200).json();
                    next();
                })
                .catch((err) => {
                    console.log('err');
                    res.status(404);
                    next();
                });
        });
        

    router.route('/')
        .put(function (req, res) {
            console.log('put');
            res.send('put');
        });

    return router;
}

async function getGroups(req,res,next){
    let group

    try {
        group=await Groups.findById(req.params.groupId)
        if(group==null){
            return res.status(404).json({message: 'Cannot find group'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    
    res.group=group
    next()
}
module.exports = GroupRouter;