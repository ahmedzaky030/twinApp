var mongoose = require('../config/connection');

var OrderSchema = {
    orderCode: String,
    teethOrder:String,
    status:String,
    orderType:String,
    cost: Number,
    deliveryDate: Date,
    technicianName:String
}

var schema = mongoose.Schema(OrderSchema);
var OrderModel = mongoose.model('Order', schema);

module.exports = OrderModel;
