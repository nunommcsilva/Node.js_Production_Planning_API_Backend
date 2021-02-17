let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let scopes = require('./scopes');

let RoleSchema = new Schema({
    name: { type: String, required: true },
    scopes: [{ type: String, enum: [scopes["read-all"], scopes["read-psts"], scopes["manage-posts"]] }]
});
// create a Schema
let UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    notes: { type: String },
    role: { type: RoleSchema }
    //role: { type: Schema.Types.ObjectId, ref: 'Role', required: true}
});

// the schema is useless so far
// we need to create a model using it
let User = mongoose.model('User', UserSchema);

// make this available to our users in our Node application
module.exports = User;