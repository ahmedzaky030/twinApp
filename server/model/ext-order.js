var mongoose = require('../config/connection');

var ExtOrderSchema = {
    orderCode: String,
    cost:Number,
    StartDate:Date,
    DeliveryDate: Date,
    TargetLaboratory: String
}

var schema = mongoose.Schema(ExtOrderSchema);
var ExtOrderModel = mongoose.model('ExtOrder', schema);

module.exports =  ExtOrderModel;
