let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TraceabilityPurchaseSchema = new Schema({
    batch_number: { type: String },
    expiration_date: { type: Date },
    notes: { type: String },
    purchaseorder_id: { type: Schema.Types.ObjectId, ref: 'Purchase', required: true },
    item_id: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
    tags: [{ type: String }]
});

// The schema is useless so far
// We need to create a model using it
let TraceabilityPurchase = mongoose.model('TraceabilityPurchase', TraceabilityPurchaseSchema);

// Make this available to our users in our Node applications
module.exports = TraceabilityPurchase;