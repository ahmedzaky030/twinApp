var mongoose = require('../config/connection');

var OrderSchema = {
    OrderCode: String,
    teethOrder:String,
    status:String,
    orderType:String,
    cost: String,
    deliveryDate: String,
    technicianName:String
}

var schema = mongoose.Schema(OrderSchema);
var OrderModel = mongoose.model('Order', schema);

module.exports = OrderModel;
