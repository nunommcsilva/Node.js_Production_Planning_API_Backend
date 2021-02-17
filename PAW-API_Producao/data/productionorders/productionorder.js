let mongoose = require('mongoose');
const Item = require('../items/item');
let Schema = mongoose.Schema;

let ProductionSchema = new Schema({
    status: { type: String, required: true },
    demand_quant: { type: Number },
    // efect_quant: { type: Number,
    //     default: function(req,res,next){
    //         stock=Item.findById(req.body.item)
    //         Item.findById(req.body.item).then(
    //             (stock)=>{
    //                 nStock=stock.stock;
    //             }
    //         )
    //         this.efect_quant=this.demand_quant-nStock;
    //         next();
    //     }},
    efect_quant:{type: Number},
    date_created: { type: Date, default: Date.now },
    date_start: { type: Date, default: Date.now },
    date_finish: { type: Date, default:""},
    assigned_to: { type: String },
    notes: { type: String },
    item_id: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
    tags: [{ type: String }]
});

ProductionSchema.methods.getEfect=function(req,res,next){
    stock=Item.findById(req.body.item_id)
    Item.findById(req.body.item_id).then(
        (stock)=>{
            nStock=stock.stock;
        }
    )
    return this.efect_quant=this.demand_quant-nStock;
}

// ProductionSchema.virtual("efect_quant").get(function(req,res,next){
//     stock=Item.findById(req.body.item_id)
//     Item.findById(req.body.item_id).then(
//         (stock)=>{
//             nStock=stock.stock;
//         }
//     )
//     return this.demand_quant-nStock;
// })

// The schema is useless so far
// We need to create a model using it
let Production = mongoose.model('Production', ProductionSchema);

// Make this available to our users in our Node applications
module.exports = Production;