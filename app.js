const express = require("express");

const app= express();

//middleware


//Routes
app.get('/',(req,res)=>{
    res.send('home route')
})

app.get('/posts',(req,res)=>{
    res.send("post route")
})
//listening to the port
app.listen(3000);