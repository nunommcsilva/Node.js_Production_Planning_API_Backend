const bodyParser = require('body-parser');
const express = require('express');
const Purchases = require('../data/purchaseorders');
const Items = require('../data/items');
const Purchase = require('../data/purchaseorders/purchaseorder');

function PurchaseRouter() {
    let router = express();

    router.use(bodyParser.json({ limit: '100mb' }));
    router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    router.use(function (req, res, next) {
        console.log('Time:', Date.now())
        next();
    });

    router.route('/purchaseorders')
        .get(function (req, res, next) {
            console.log('get all purchase orders');
            Purchases.findAll()
                .then((orders) => {
                    res.send(orders);
                    next();
                })
                .catch((err) => {
                    next();
                })
        })
        .post(function (req, res, next) {
            console.log('post');
            let body = req.body;

            Purchases.create(body)
                .then(() => {
                    console.log('saved');
                    res.status(200);
                    res.send(body);
                    next();
                })
                .catch((err) => {
                    console.log(req.body);
                    console.log('It is not possible to save');
                    err.status = err.status || 500;
                    res.status(401);
                    next();
                });


        });


    router.route('/purchaseorders/:purchaseorderId')
        .get(function (req, res, next) {
            let purchaseorderId = req.params.purchaseorderId

            Purchases.findById(purchaseorderId)
                .then((purch) => {
                    res.status(200);
                    res.send(purch);
                    next();
                })
                .catch((err) => {
                    next();
                })

        })
        .patch(getPurch, async (req, res) => {
            if (req.body.status != null) {
                res.purch.status = req.body.status
            }
            if(req.body.demand_quant!=null){
                res.purch.demand_quant=req.body.demand_quant
            }
            if(req.body.efect_quant!=null){
                res.purch.efect_quant=req.body.efect_quant
            }
            if(req.body.date_created!=null){
                res.purch.date_created=req.body.date_created
            }
            if(req.body.date_deliver!=null){
                res.purch.date_deliver=req.body.date_deliver
            }
            if(req.body.vendor_name!=null){
                res.purch.vendor_name=req.body.vendor_name
            }
            if(req.body.vendor_email!=null){
                res.purch.vendor_email=req.body.vendor_email
            }
            if(req.body.price_per_unit!=null){
                res.purch.price_per_unit=req.body.price_per_unit
            }
            if(req.body.currency!=null){
                res.purch.currency=req.body.currency
            }
            if(req.body.notes!=null){
                res.purch.notes=req.body.notes
            }
            if(req.body.item!=null){
                res.purch.item=req.body.item
            }
            if(req.body.tags!=null){
                res.purch.tags=req.body.tags
            }
            try {
                const updatePurchase = await res.purch.save();
                res.json(updatePurchase)
            } catch (err) {
                res.status(400).json({ message: err.message })
            }
        })
        .delete(function (req, res, next) {
            console.log('del for one Id');
            let purchaseorderId = req.params.purchaseorderId;
            Purchases.removeById(purchaseorderId)
                .then(() => {
                    console.log('deleted');
                    res.status(200).json();
                    next();
                })
                .catch((err) => {
                    console.log('err');
                    res.status(404);
                    next()
                })
        });

    router.route('/')
        .put(function (req, res) {
            console.log('put');
            res.send('put');
        });

    return router;
}

async function getPurch(req, res, next) {
    let purch

    try {
        purch = await Purchases.findById(req.params.purchaseorderId)
        if (purch == null) {
            return res.status(404).json({ message: 'Cannot find purchase order' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.purch = purch
    next()
}
module.exports = PurchaseRouter;