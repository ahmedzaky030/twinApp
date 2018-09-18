var mongoose = require('../config/connection');
var itemSchema = {
    itemName: String,
    type:String,
    price:Number,
    quantity:Number,
    validateDate:Date,
}

var schema = mongoose.Schema(itemSchema);
var ItemModel = mongoose.model('Item', schema);

module.exports = ItemModel;