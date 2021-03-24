const User = require('../models/user');

//funtion to find all users
async function findOne(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error. We are looking into this." });
  }
}

//function to add new user
async function addUser(req,res){
  const user=new User({
    name:req.body.name,
    email:req.body.email,
    age:req.body.age,
    bio:req.body.bio,
    role:req.body.role
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error. We are looking into this." });
  }
}

//function to find a specific user
async function findSpecificUser(req,res){
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error. We are looking into this." });
  }
}

//function to delete a specific user
async function deleteUser(req,res){
    try {
      const removeUser = await User.remove({ _id: req.params.userId });
      res.json(removeUser);
    }catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error. We are looking into this." });
  }
}

//function to update a specific user details
async function updateUser(req,res){
  try{
    const updateUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          name: req.body.name,
          bio: req.body.bio,
          role: req.body.bio,
        },
      }
    ); //JUST UPDATING NAME,BIO,ROLE OF USE
    res.json(updateUser)
  }
    catch (err) {
        res
        .status(500)
        .json({ message: "Internal Server Error. We are looking into this." });
    }
}

module.exports = {
    findOne,
    addUser,
    findSpecificUser,
    deleteUser,
    updateUser
}