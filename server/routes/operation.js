var router = require('express').Router();
var Operation = require('../model/operation');
var errorLog = require('chalk').red;
var Item = require('../model/item');

router
.get('/' , (req, res) => {
    //res.json({'message': 'hello from operation router'});
    
    Operation.find({}).populate("ingredients.item").exec((err, result)=>{
        if(err) console.log(error);
        res.json(result);
    })
})
.get('/search/:search' , (req, res) => {
    //res.json({'message': 'hello from operation router'});
    var search = req.params.search;
    console.log('search operation name by', search )
    
    Operation.find({operationName : { '$regex': search , '$options': 'i'} }).populate("ingredients.item").exec((err, doc)=>{
        if(err) console.log(error);
       res.json(doc);
    })

    // (err, result)=>{
    //     if(err) console.log(error);
    //     res.json(result);
    // }
})
.post('/', (req ,res) => {
   // console.log(body({"body":"hello"}))
   var doc =  req.body;
   console.log('new operation doc', doc);
   
//    var operation = new Operation();
//    operation.save(function(err){
//        if(err) console.log(err);
//        else {
//            operation.
//        }
//    })
    
    
    
   Operation.create(doc,(err, result)=> {
       if(err) console.log(errorLog(err));
       else {
        
       console.log('operation result',result);
       res.json(result);
       }
   })
})
.put('/:id', (req, res) =>{
    var doc =  req.body;
    console.log('document to modify',doc);
    var id = req.params.id;
   Operation.findByIdAndUpdate(id, doc ,(err, result)=> {
       if(err) console.log(errorLog(err));
       console.log(result);
       res.json(result);
   })
})
.delete('/:id', (req, res)=>{
    var id= req.params.id;
    Operation.findOneAndRemove({_id:id}, (err, result)=> {
        if(err) console.log(errorLog(err))
        console.log(result);
        res.json(result);
    })
})


module.exports = router;