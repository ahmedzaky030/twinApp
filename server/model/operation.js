var mongoose = require('../config/connection');

var operationSchema = {
    operationName: String,
    items:[
        {   
            itemName: String,
            quantity: Number,
            unit: String
        }
    ]
}



var schema = mongoose.Schema(operationSchema);
var OperationModel = mongoose.model('Operation', schema);

module.exports =  OperationModel;