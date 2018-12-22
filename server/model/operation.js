var mongoose = require('../config/connection');

var operationSchema = {
    operationName: String,
    ingredients:[
        {   
            item: {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Item'
            },
            quantity: Number,
            unit: String
        }
    ],
    price: Number
}



var schema = mongoose.Schema(operationSchema);
var OperationModel = mongoose.model('Operation', schema);

module.exports =  OperationModel;