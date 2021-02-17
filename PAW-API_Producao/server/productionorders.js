const bodyParser = require('body-parser');
const express = require('express');
const Productions = require('../data/productionorders');
const Items = require('../data/items');
const Production = require('../data/productionorders/productionorder');

function ProductionRouter() {
    let router = express();

    router.use(bodyParser.json({ limit: '100mb' }));
    router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    router.use(function (req, res, next) {
        console.log('Time:', Date.now())
        next();
    });

    router.route('/productionorders')
        // .get(async function(req, res, next) {
        //     try{
        //         const data=await Production.find()
        //             .populate({path:'productionorders',select:'status demand_quant efect_quant'});
        //             res.status(200).json({success:true, data});
        //     }catch(err){
        //         res.status(400).json({success:false,message:err.message}); 
        //     }
        // })
        .get(function (req, res, next) {
            console.log('get all production orders');
            Productions.findAll()
                .then((orders) => {
                    res.send(orders);
                    //Production.populate({path:'productionorder',select:'status demand_quant efect_quant date_created date_start date_finish assigned_to notes item_id tags'})
                    next();
                })
                .catch((err) => {
                    next();
                })
        })
        .post(function (req, res, next) {
            console.log('post');
            let body = req.body;
            
            Productions.create(body)
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

    router.route('/productionorders/:productionorderId')
        .get(function (req, res, next) {
            // console.log('get production order for one Id');
            let productionorderId = req.params.productionorderId

            Productions.findById(productionorderId)
                .then((order) => {
                    res.status(200);
                    res.send(order);
                    next();
                })
                .catch((err) => {
                    next();
                })
        })
        .patch(getProds, async (req, res) => {
            if (req.body.status != null) {
                res.prod.status = req.body.status
            }
            if(req.body.demand_quant != null){
                res.prod.demand_quant=req.body.demand_quant
            }
            if(req.body.efect_quant != null){
                res.prod.efect_quant=req.body.efect_quant
            }
            if(req.body.date_created != null){
                res.prod.date_created=req.body.date_created
            }
            if(req.body.date_start != null){
                res.prod.date_start=req.body.date_start
            }
            if(req.body.date_finish != null){
                res.prod.date_finish=req.body.date_finish
            }
            if(req.body.assigned_to != null){
                res.prod.assigned_to=req.body.assigned_to
            }
            if(req.body.notes != null){
                res.prod.notes=req.body.notes
            }
            if(req.body.item != null){
                res.prod.item=req.body.item
            }
            if(req.body.tags != null){
                res.prod.tags=req.body.tags
            }
            try {
                const updateOrder = await res.prod.save();
                res.json(updateOrder)
            } catch (err) {
                res.status(400).json({ message: err.message })
            }
        })
        .delete(function (req, res, next) {
            console.log('del for one Id');
            let productionorderId = req.params.productionorderId;
            Productions.removeById(productionorderId)
                .then(() => {
                    console.log('deleted');
                    res.status(200).json();
                    next();
                })
                .catch((err) => {
                    console.log('err');
                    res.status(404);
                    next();
                })
        });

    router.route('/')
        .put(function (req, res) {
            console.log('put');
            res.send('put');
        });

    return router;
}

async function getProds(req, res, next) {
    let prod

    try {
        prod = await Productions.findById(req.params.productionorderId)
        if (prod == null) {
            return res.status(404).json({ message: 'Cannot find production order' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.prod = prod
    next()
}
module.exports = ProductionRouter;