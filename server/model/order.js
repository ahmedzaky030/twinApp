var mongoose = require('../config/connection');

var OrderSchema = {
    orderCode: String,
    teethOrder:String,
    status:String,
    orderType:{ type:mongoose.Schema.Types.ObjectId, ref:'Operation'},
    cost: Number,
    orderDate: Date,
    deliveryDate: Date,
    technicianName:String,
    client: {
        student : {type:mongoose.Schema.Types.ObjectId, ref:'Student'},
        clinic : {type:mongoose.Schema.Types.ObjectId, ref:'Clinic'}        
    }
}

var schema = mongoose.Schema(OrderSchema);
var OrderModel = mongoose.model('Order', schema);

module.exports = OrderModel;
