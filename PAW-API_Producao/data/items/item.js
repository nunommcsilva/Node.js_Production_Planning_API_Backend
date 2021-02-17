let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ItemSchema = new Schema({
    name: { type: String, required: true, unique: true },
    stock: { type: Number },
    lead_time: { type: Number },
    procured_item: { type: Boolean },
    unite_measure: { type: String },
    selling_price: { type: Number },
    default_storage_location: { type: String },
    notes: { type: String },
    bomgroup_id: { type: Schema.Types.ObjectId, ref: 'Group',required:true },
    tags: [{ type: String }]
});

ItemSchema.virtual('bomgroups', {
    ref: 'Group',
    localField: '_id',
    foreignField: 'item',
});

ItemSchema.virtual('productionorders', {
    ref: 'Production',
    localField: '_id',
    foreignField: 'item',
});

ItemSchema.virtual('purchaseorders', {
    ref: 'Purchase',
    localField: '_id',
    foreignField: 'item',
});

ItemSchema.virtual('traceabilitypurchases', {
    ref: 'TraceabilityPurchase',
    localField: '_id',
    foreignField: 'item',
});

ItemSchema.virtual('traceabilityproductions', {
    ref: 'TraceabilityProduction',
    localField: '_id',
    foreignField: 'item',
});

ItemSchema.set('toObject', { virtuals: true });
ItemSchema.set('toJSON', { virtuals: true });


let Item = mongoose.model('Item', ItemSchema);

module.exports = Item;