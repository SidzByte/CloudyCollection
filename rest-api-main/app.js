const express = require('express');
const app = express();
const productRoute = require('./api/routes/product');
const userRoute = require('./api/routes/user');
const categorypath = require('./api/routes/category')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { urlencoded, json } = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');


mongoose.connect('mongodb+srv://sidz:mongo123@mongosid.nz3cy.mongodb.net/?retryWrites=true&w=majority&appName=mongosid',{useNewUrlParser:true, useUnifiedTopology: true});


mongoose.connection.on('error',err=>{
  console.log('connection failed');
});

mongoose.connection.on('connected',()=>{
  console.log('connected successfully with database');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(fileUpload({
  useTempFiles:true
}))

app.use(cors());

app.use('/product',productRoute);
app.use('/user',userRoute);
app.use('/category',categorypath);

//Global Error Handling in Backend
app.get('*',(req,res,next)=>{
  res.status(500).json({
    message: "url not found"
  })
})

module.exports = app;
