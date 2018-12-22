 var router = require('express').Router();
 
 var clinicRouter = require('./clinic');
 var orderRouter = require('./order');
 var extOrderRouter = require('./ext-order');
 var itemRouter = require('./item');
 var studentRouter = require('./student');
 var technicianRouter = require('./technician');
 var operationRouter = require('./operation');
 var storeRouter = require('./store');
 


 router.use('/clinic', clinicRouter);
 router.use('/order', orderRouter);
 router.use('/ext-order', extOrderRouter);
 router.use('/item', itemRouter);
 router.use('/student', studentRouter);
 router.use('/technician', technicianRouter);
 router.use('/operation', operationRouter);
 router.use('/store', storeRouter );
 
 router.get('/test', (req, res) => {

   res.json({
     "start": "Now"
   })
 })

 module.exports = router;