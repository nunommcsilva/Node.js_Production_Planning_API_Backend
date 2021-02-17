const bodyParser = require('body-parser');
const express = require('express');
const TraceabilityPurchases=require('../data/traceabilitypurchases');

function TraceabilityPurchaseRouter() {
    let router = express();

    router.use(bodyParser.json({ limit: '100mb' }));
    router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    router.use(function (req, res, next) {
        console.log('Time:', Date.now())
        next();
    });


    router.route('/traceabilitypurchases')
        .get(function (req, res, next) {
            console.log('get all Traceability Purchases');
            TraceabilityPurchases.findAll()
                .then((trace) => {
                    res.send(trace);
                    next();
                })
                .catch((err) => {
                    next();
                })
        })
        .post(function (req, res, next) {
            console.log('post');
            let body = req.body;

            TraceabilityPurchases.create(body)
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

        router.route('/traceabilitypurchases/:traceabilitypurchasesId')
        .get(function (req, res, next) {
            let traceabilitypurchasesId = req.params.traceabilitypurchasesId

            TraceabilityPurchases.findById(traceabilitypurchasesId)
                .then((trace) => {
                    res.status(200);
                    res.send(trace);
                    next();
                })
                .catch((err) => {
                    next();
                })

        })
        .patch(getTrace, async (req, res) => {
            if (req.body.batch_number != null) {
                res.trace.batch_number = req.body.batch_number
            }
            if (req.body.expiration_date != null) {
                res.trace.expiration_date = req.body.expiration_date
            }
            if (req.body.notes != null) {
                res.trace.notes = req.body.notes
            }
            if (req.body.purchaseorder != null) {
                res.trace.purchaseorder = req.body.purchaseorder
            }
            if (req.body.item != null) {
                res.trace.item = req.body.item
            }
            if (req.body.tags != null) {
                res.trace.tags = req.body.tags
            }
            try {
                const updateTraceabilityPurchases = await res.trace.save();
                res.json(updateTraceabilityPurchases)
            } catch (err) {
                res.status(400).json({ message: err.message })
            }
        })
        .delete(getTrace, async (req, res)=> {
            try {
                await res.trace.remove()
                res.status(200).json({
                    message:'Deleted'
                })
            } catch (err) {
                res.status(500).json({message: err.message})
            }
        });

        router.route('/')
            .put(function (req, res) {
                console.log('put');
                res.send('put');
        });

    return router;
}

async function getTrace(req, res, next) {
    let trace

    try {
        trace = await TraceabilityPurchases.findById(req.params.traceabilitypurchasesId)
        if (trace == null) {
            return res.status(404).json({ message: 'Cannot find Traceability Purchase' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.trace = trace
    next()
}
module.exports = TraceabilityPurchaseRouter;