const express = require("express");
const app= express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors=require('cors');
const methodOverride=require('method-override')
//import routes
const userRoute=require('./Routes/users');

app.set('view engine','ejs');

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

//ADDING USER ROUTER
app.use('/users',userRoute);



//MAIN ROUTE
app.get('/',(req,res)=>{
  // res.json({'description':"REST API V 1.0","route":"go to /users to see all users"})
  res.render('index');
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
