const express = require('express');
const app = express();
const morgan  = require('morgan');
const port = 3000;
var routes = require('./routes');
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api',routes);
app.get('/', (req , res) => res.send(`Hello World from ${port} , Hi `  ));

app.listen(port  , ()=> {
    console.log(`server is working now  on ${port}`);
})
