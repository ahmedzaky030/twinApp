var mongoose = require('../config/connection');

var StoreSchema = {
    item : { type:mongoose.Schema.Types.ObjectId, ref:'Item'},
    quantityConsumed: Number,
    quantityRemained: Number,
    createdAt:Date,
    updatedAt: Date
    
}

var schema = mongoose.Schema(StoreSchema);
var StoreModel = mongoose.model('Store', schema);

module.exports = StoreModel;
