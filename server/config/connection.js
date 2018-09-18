var mongoose = require('mongoose');
var chalk = require('chalk');

var dbUrl = require('./db').url;

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

mongoose.connect(dbUrl , (err , db)=> {
    if(err) console.log(err);
    // db.createCollection('clinics',()=>{
    //     if(err) console.log(err);
    //     console.log('Collection created');
    // });
    
    // db.createCollection('items', ()=> {
    //     if(err) console.log(err);
    //     console.log('Collection created');
    // })

    // db.createCollection('technicians', ()=> {
    //     if(err) console.log(err);
    //     console.log('Collection created');
    // })

    // db.createCollection('extOrders', ()=> {
    //     if(err) console.log(err);
    //     console.log('Collection created');
    // })

    // db.createCollection('orders', ()=> {
    //     if(err) console.log(err);
    //     console.log('Collection created');
    // })

    // db.createCollection('students', ()=> {
    //     if(err) console.log(err);
    //     console.log('Collection created');
    // })
});

mongoose.connection.on('connected' , () =>{
    console.log(connected('Mongoose defaulat connection is open to', dbUrl))
})

mongoose.connection.on('error', (err) =>{
    console.log(error('Mongoose has error', err));
})

module.exports = mongoose;