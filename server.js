const express = require('express');
const dotenv = require('dotenv');
const products = require('./routes/products');
const users = require('./routes/users');
const errorHandler =require('./middlewares/errorHandler');


dotenv.config({path:'./config/config.env'});

const app = express();
var sequelize = require('./config/orm');

app.use(express.json());
app.use('/api/products',products);
app.use('/api/auth',users);

app.use(errorHandler);

const port = process.env.PORT_NO || 3000;

app.listen(port,()=>{
    console.log('listening on',port)
})
