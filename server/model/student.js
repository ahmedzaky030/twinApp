var mongoose = require('../config/connection');
var StudentSchema = {
    studentName: String,
    university:String,
    grade:String,
    requirement: {
        frst: {type:Boolean, default:0},
        scnd:{type:Boolean, default:0},
        thrd:{type:Boolean, default:0},
        frth:{type:Boolean, default:0}
    },
    code: String,
}



var schema = mongoose.Schema(StudentSchema);
var StudentModel = mongoose.model('Student', schema);

module.exports = StudentModel;