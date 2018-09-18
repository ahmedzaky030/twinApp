var mongoose = require('../config/connection');

var TechnicianSchema = {
    technicianName: String,
    partRate: String,
    monthlyRate: String
}

var schema = mongoose.Schema(TechnicianSchema);
var technicianModel = mongoose.model('Technician', schema);

module.exports = technicianModel;