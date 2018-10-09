var mongoose = require('../config/connection');

var ExtOrderSchema = {
    orderCode: String,
    cost:Number,
    paid: Number,
    startDate:Date,
    deliveryDate: Date,
    targetLaboratory: String
}

var schema = mongoose.Schema(ExtOrderSchema);
var ExtOrderModel = mongoose.model('ExtOrder', schema);

module.exports =  ExtOrderModel;
