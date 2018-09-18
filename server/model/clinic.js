var mongoose = require('../config/connection');

var clinicSchema = {
    clinicName: String,
    clinicPhoneNum:String,
    address:String
}

var schema = mongoose.Schema(clinicSchema);
var ClinicModel = mongoose.model('Clinic', schema);

module.exports =  ClinicModel;