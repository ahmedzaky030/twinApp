var router = require('express').Router();
var Order = require('../model/order');
var errorLog = require('chalk').red;
var Store = require('../model/store');
var Operation = require('../model/operation');
var chalk = require('chalk');

var orderFinished = require('chalk').green;

router
.get('/' , (req, res) => {
    //res.json({'message': 'hello from Order router'});
    
    Order.find({}).populate("orderType","operationName").exec((err, result)=>{
        if(err) console.log(error);
        res.json(result);
    })
})
.get('/finished' , (req, res) => {
    //res.json({'message': 'hello from Order router'});
    
    Order.find({status:'Finished'}).populate("orderType","operationName price").exec((err, result)=>{
        if(err) console.log(err);
        //console.log(orderFinished(result));
        res.json(result);
    })
})
.get('/:id/type/:type', (req, res)=>{
    var type = req.params.type;
    var id = req.params.id;
    if(type == 'student'){
        // Find a way to search by student id in client and how to populate it again
        Order.find( {"client.student": id}).populate("client.student" ,"studentName").populate("orderType","operationName").exec((err, result) => {
            if(err) console.log(err);
            console.log('students' , result);
            res.json(result);
        })
        // the same for clinic
    } else if( type == 'clinic'){
        Order.find({client : {clinic : id }}).populate("client.clinic", "clinicName").populate("orderType","operationName").exec((err, result) => {
            if(err) console.log(err);
            console.log('clinics' , result);
        })
    }    
})
.get('/search/:search' , (req, res) => {
    //res.json({'message': 'hello from clinic router'});
    var search = req.params.search;
    console.log('search clinic name by', search )
    Order.find({ orderCode : { '$regex': search , '$options': 'i'} },(err, result)=>{
        if(err) console.log(error);
        res.json(result);
    })
})
.post('/', (req ,res) => {
   // console.log(body({"body":"hello"}))
   var doc =  req.body;
   console.log('new order body to be created', doc)
   Order.create(doc,(err, result)=> {
       if(err) console.log(errorLog(err));
       console.log('new Order',result);
       res.json(result);
   })
})
.put('/:id', (req, res) =>{
    var doc =  req.body;
    console.log('document to modify',doc);
    var id = req.params.id;
    console.log(doc)
    if(doc.status == 'Finished'){
        Operation.findById(doc.orderType).populate("ingredients.item").exec( (err , opObj) =>{
            if(err) console.log(err);
            else {
                opObj.ingredients.forEach((v,i)=>{
                    
                    console.log('item',v.item._id);
                    Store.findOneAndUpdate({item:v.item._id} , {  $inc :{quantityConsumed : v.quantity , quantityRemained: -v.quantity}  }, (err , store)=> {
                        console.log(chalk.yellow('store result', store));                        
                    })
                })
            }
        })
    }
   Order.findByIdAndUpdate(id, doc ,(err, result)=> {
       if(err) console.log(errorLog(err));
       console.log(result);
       res.json(result);
   })
})
.delete('/:id', (req, res)=>{
    var id= req.params.id;
    Order.findOneAndRemove({_id:id}, (err, result)=> {
        if(err) console.log(errorLog(err))
        console.log(result);
        res.json(result);
    })
})


module.exports = router;