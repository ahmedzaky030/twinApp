var router = require('express').Router();
var Technician = require('../model/technician');
var errorLog = require('chalk').red;

router
.get('/' , (req, res) => {
    //res.json({'message': 'hello from Technician router'});
    
    Technician.find((err, result)=>{
        if(err) console.log(error);
        res.json(result);
    })
})
.get('/search/:search' , (req, res) => {
    //res.json({'message': 'hello from clinic router'});
    var search = req.params.search;
    console.log('search technician name by', search )
    Technician.find({technicianName : { '$regex': search , '$options': 'i'} },(err, result)=>{
        if(err) console.log(error);
        res.json(result);
    })
})
.post('/', (req ,res) => {
   // console.log(body({"body":"hello"}))
   var doc =  req.body;
   Technician.create(doc,(err, result)=> {
       if(err) console.log(errorLog(err));
       console.log(result);
       res.json(result);
   })
})
.put('/:id', (req, res) =>{
    var doc =  req.body;
    console.log('document to modify',doc);
    var id = req.params.id;
   Technician.findByIdAndUpdate(id, doc ,(err, result)=> {
       if(err) console.log(errorLog(err));
       console.log(result);
       res.json(result);
   })
})
.delete('/:id', (req, res)=>{
    var id= req.params.id;
    Technician.findOneAndRemove({_id:id}, (err, result)=> {
        if(err) console.log(errorLog(err))
        console.log(result);
        res.json(result);
    })
})


module.exports = router;