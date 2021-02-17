let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PurchaseSchema = new Schema({
    status: { type: String, required: true },
    demand_quant: { type: Number },
    efect_quant: { type: Number },
    date_created: { type: Date, default: Date.now },
    date_deliver: { type: Date, default: Date.now },
    vendor_name: { type: String },
    vendor_email: { type: String },
    price_per_unit: { type: Number },
    currency: { type: String },
    notes: { type: String },
    item_id: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
    tags: [{ type: String }]
});

PurchaseSchema.virtual('traceabilitypurchases', {
    ref: 'TraceabilityPurchase',
    localField: '_id',
    foreignField: 'purchaseorder',
});

// The schema is useless so far
// We need to create a model using it
let Purchase = mongoose.model('Purchase', PurchaseSchema);

// Make this available to our users in our Node applications
module.exports = Purchase;