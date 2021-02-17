const bodyParser = require('body-parser');
const express = require('express');
const Groups = require('../data/bomgroups/bomgroup');
const Item = require('../data/items/item');
const ProductionOrders = require('../data/productionorders/productionorder');
const PurchaseOrders = require('../data/purchaseorders/purchaseorder');
const TraceabilityProduction = require('../data/traceabilityproductions/traceabilityproduction');
const TraceabilityPurchase = require('../data/traceabilitypurchases/traceabilitypurchase');
const Users = require('../data/users/user');

function SearchRouter() {
let router = express();

router.use(bodyParser.json({limit: '100mb'}));
router.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

router.use(function(req, res, next) {
    console.log('Time:', Date.now())
    next();
});


router.get('/search/bomgroups', (req, res, next) => {
    const searchedField = req.query.tags;
    Groups.find({tags:{$regex: searchedField, $options: '$i'}})
    .then(data => {
        res.send(data);
    })
});

router.get('/search/item', (req, res, next) => {
    const searchedField = req.query.tags;
    Item.find({tags:{$regex: searchedField, $options: '$i'}})
    .then(data => {
        res.send(data);
    })
});

router.get('/search/productionorders', (req, res, next) => {
    const searchedField = req.query.tags;
    ProductionOrders.find({tags:{$regex: searchedField, $options: '$i'}})
    .then(data => {
        res.send(data);
    })
});

router.get('/search/purchaseorders', (req, res, next) => {
    const searchedField = req.query.tags;
    PurchaseOrders.find({tags:{$regex: searchedField, $options: '$i'}})
    .then(data => {
        res.send(data);
    })
});

router.get('/search/traceabilityproduction', (req, res, next) => {
    const searchedField = req.query.tags;
    TraceabilityProduction.find({tags:{$regex: searchedField, $options: '$i'}})
    .then(data => {
        res.send(data);
    })
});

router.get('/search/traceabilitypurchase', (req, res, next) => {
    const searchedField = req.query.tags;
    TraceabilityPurchase.find({tags:{$regex: searchedField, $options: '$i'}})
    .then(data => {
        res.send(data);
    })
});

router.get('/search/user', (req, res, next) => {
    const searchedField = req.query.name;
    Users.find({name:{$regex: searchedField, $options: '$i'}})
    .then(data => {
        res.send(data);
    })
});



return router;
}

module.exports = SearchRouter;