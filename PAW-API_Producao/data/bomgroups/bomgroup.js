let mongoose = require('mongoose');
let Schema = mongoose.Schema;


// Create a Schema
let GroupSchema = new Schema({
    name: { type: String, required: true, unique: true },
    cost: { type: Number },
    notes: { type: String },
    tags: [ { type: String }]
});

GroupSchema.virtual('items', {
    ref: 'Item',
    localField: '_id',
    foreignField: 'item',
});

GroupSchema.set('toObject', { virtuals: true });
GroupSchema.set('toJSON', { virtuals: true });

// The schema is useless so far
// We need to create a model using it
let Group = mongoose.model('Group', GroupSchema);

// Make this available to our users in our Node applications
module.exports = Group;
