var router = require('express').Router();
var Store = require('../model/store');
var errorLog = require('chalk').red;


router
.get('/' , (req, res) => {
    //res.json({'message': 'hello from store router'});
    
    Store.find({}).populate('item','itemName').exec((err, result)=>{
        if(err) console.log(error);
        else {
        console.log('result', result);
        res.json(result);
        }
    })
})
// .get('/search/:search' , (req, res) => {
//     //res.json({'message': 'hello from store router'});
//     var search = req.params.search;
//     console.log('search store name by', search )
//     Store.find({storeName : { '$regex': search , '$options': 'i'} },(err, result)=>{
//         if(err) console.log(error);
//         res.json(result);
//     })
// })
// .post('/', (req ,res) => {
//    // console.log(body({"body":"hello"}))
//    var doc =  req.body;
//    Store.create(doc,(err, result)=> {
//        if(err) console.log(errorLog(err));
//        console.log(result);
//        res.json(result);
//    })
// })
// .put('/:id', (req, res) =>{
//     var doc =  req.body;
//     console.log('document to modify',doc);
//     var id = req.params.id;
//    Store.findByIdAndUpdate(id, doc ,(err, result)=> {
//        if(err) console.log(errorLog(err));
//        console.log(result);
//        res.json(result);
//    })
// })
// .delete('/:id', (req, res)=>{
//     var id= req.params.id;
//     Store.findOneAndRemove({_id:id}, (err, result)=> {
//         if(err) console.log(errorLog(err))
//         console.log(result);
//         res.json(result);
//     })
// })


module.exports = router;