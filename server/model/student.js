var mongoose = require('../config/connection');
var StudentSchema = {
    studentName: String,
    university:String,
    Grade:String
}

var schema = mongoose.Schema(StudentSchema);
var StudentModel = mongoose.model('Student', schema);

module.exports = StudentModel;