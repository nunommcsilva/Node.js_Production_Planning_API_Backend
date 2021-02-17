const bodyParser = require('body-parser');
const express = require('express');
const Items = require('../data/items');
const Item = require('../data/items/item');

function ItemRouter() {
    let router = express();

    router.use(bodyParser.json({ limit: '100mb' }));
    router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    router.use(function (req, res, next) {
        console.log('Time:', Date.now())
        next();
    });


    router.route('/items')
        .get(async function(req, res, next) {
            try{
                const data=await Item.find()
                    .populate({path:'bombgroups',select:'name cost notes tags'});
                    res.status(200).json({success:true, data});
            }catch(err){
                res.status(400).json({success:false,message:err.message}); 
            }
        })
        /*.get(function (req, res, next) {
            console.log('get all BOM groups');
            Groups.findAll()
                .then((groups) => {
                    res.send(groups);
                    next();
                })
                .catch((err) => {
                    next();
                })
        })*/

        .post(function (req, res, next) {
            console.log('post');
            let body = req.body;

            Items.create(body)
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
        
    router.route('/items/:itemId')
        .get(function (req, res, next) {
            console.log('get for one Id');
            let itemId = req.params.itemId;

            Items.findById(itemId)
                .then((item) => {
                    res.status(200);
                    res.send(item);
                    next();
                })

                .catch((err) => {
                    res.status(404);
                    next();
                })
        })
        .put(function (req, res, next) {
            console.log('put for one Id');
            let itemId = req.params.itemId;
            let body = req.params.body;

            Items.update(itemId, body)
                .then((item) => {
                    res.status(200);
                    res.send(item);
                    next();
                })
                .catch((err) => {
                    res.status(404);
                    next();
                });
        })
        .patch(getItems, async(req,res)=>{
            if(req.body.name!=null){
                res.item.name=req.body.name
            }
            if(req.body.stock!=null){
                res.item.stock=req.body.stock
            }
            if(req.body.lead_time!=null){
                res.item.lead_time=req.body.lead_time
            }
            if(req.body.procured_item!=null){
                res.item.procured_item=req.body.procured_item
            }
            if(req.body.unite_measure!=null){
                res.item.unite_measure=req.body.unite_measure
            }
            if(req.body.selling_price!=null){
                res.item.selling_price=req.body.selling_price
            }
            if(req.body.default_storage_location!=null){
                res.item.default_storage_location=req.body.default_storage_location
            }
            if(req.body.notes!=null){
                res.item.notes=req.body.notes
            }
            if(req.body.tags!=null){
                res.item.tags=req.body.tags
            }
            try {
                const updateItem=await res.item.save();
                res.json(updateItem)
            } catch (err) {
                res.status(400).json({message: err.message})
            }
        })
        .delete(function (req, res, next) {
            console.log('del for one Id');
            let itemId = req.params.itemId;
            Items.removeById(itemId)
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

async function getItems(req,res,next){
    let item

    try {
        item=await Items.findById(req.params.itemId)
        if(item==null){
            return res.status(404).json({message: 'Cannot find item'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    
    res.item=item
    next()
}
module.exports = ItemRouter;