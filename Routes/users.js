const express=require('express');

const router=express.Router();
const User=require('../models/user');

//GET ALL USERS
router.get("/", async (req, res) => {
  try{
    const users=await User.find();
    res.json(users);
  }
  catch(err){
    res.json({message:err})
  }
});

//ADD NEW USER
router.post('/', async (req,res)=>{
  const user=new User({
    name:req.body.name,
    email:req.body.email,
    age:req.body.age,
    bio:req.body.bio,
    role:req.body.role
  });
  try{
    const savedUser= await user.save();
    res.json(savedUser);
  }
  catch(err){
    res.json({message:err});
  }
});

//SPECIFIC USER
router.get('/:userId',async (req,res)=>{
  try{
    const user = await User.findById(req.params.userId);
    res.json(user);
  }
  catch(err){
    res.json({message:err});
  }
});

//DELETE USER
router.delete('/:userId',async (req,res)=>{
    try {
      const removeUser = await User.remove({ _id: req.params.userId });
      res.json(removeUser);
    } catch (err) {
      res.json({ message: err });
    }

})

//UPDATE USER
router.patch('/:userId',async (req,res)=>{
  try{
    const updateUser=await User.updateOne(
      { _id: req.params.userId }, 
      {$set: {name:req.body.name}} //I'M JUST UPDATING , WE CAN UPDATE EVERY DETAILS OF USER BY ADDING THE KEY-VALUE PAIR
    );
    res.json(updateUser)
  }
  catch(err){
    res.json({message:err})
  }
})

module.exports = router;