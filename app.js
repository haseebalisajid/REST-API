const bodyParser = require("body-parser");
const express = require("express");
const app= express();
const mongoose = require("mongoose");
const cors=require('cors');
//import routes
const userRoute=require('./Routes/users');

//middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/users',userRoute);

//Routes

app.get('/',(req,res)=>{
    res.send('home route')
})


//connecting to mongodb

const url = `mongodb+srv://testing:test12345@cluster0.fxzek.mongodb.net/users?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

//listening to the port
app.listen(3000);
