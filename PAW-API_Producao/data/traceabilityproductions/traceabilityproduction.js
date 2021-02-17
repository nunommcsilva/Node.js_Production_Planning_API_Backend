let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TraceabilityProductionSchema = new Schema({
    batch_number: { type: String, required: true },
    expiration_date: { type: Date },
    notes: { type: String },
    productionorder_id: { type: Schema.Types.ObjectId, ref: 'Production', required: true },
    item_id: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
    tags: [{ type: String }]
});

// The schema is useless so far
// We need to create a model using it
let TraceabilityProduction = mongoose.model('TraceabilityProduction', TraceabilityProductionSchema);

// Make this available to our users in our Node applications
module.exports = TraceabilityProduction;