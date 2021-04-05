const User = require('../models/user');

//funtion to find all users
async function findUsers(req, res) {
  if(req.query.search){
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    try {
      const users = await User.find({name:regex});
      res.render("users/users", { users: users });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Internal Server Error. We are looking into this." });
    }
  }
  else{
    try {
      const users = await User.find();
      res.render("users/users", { users: users });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Internal Server Error. We are looking into this." });
    }
  }

}
//function for new user

function newUser (req,res){
  res.render('users/new',{user:new User});
}
//function to save new user
async function addUser(req,res){
  let user=new User({
    name:req.body.name,
    email:req.body.email,
    bio:req.body.bio,
    role:req.body.role,
    age:req.body.age,
    experience:req.body.experience
  });
  console.log()
  try {
    user = await user.save();
    res.redirect('/users')
  } catch (err) {
    res.render('users/new',{user:user})
  }
}

//function to find a specific user
async function findSpecificUser(req,res){
  try {
    const user = await User.findById(req.params.userId);
    res.render('users/edit',{user:user});
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
      res.redirect('/users')
    }catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error. We are looking into this." });
  }
}

//function to update a specific user details
async function updateUser(req,res){
  console.log("update user")
  try{
    const updateUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          bio: req.body.bio,
          role: req.body.role,
          age: req.body.age,
          experience: req.body.experience,
        },
      }
    ); //JUST UPDATING NAME,BIO,ROLE OF USE
    res.redirect('/users')
  }
    catch (err) {
      console.log(err)
        res
        .status(500)
        .json({ message: "Internal Server Error. We are looking into this." });
    }
}

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let user = req.user
    user.title = req.body.title
    user.description = req.body.description
    user.markdown = req.body.markdown
    try {
      user = await user.save()
      res.redirect('/users')
    } catch (e) {
      res.render(`users/${path}`, { user: user })
    }
  }
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = {
    newUser,
    findUsers,
    addUser,
    findSpecificUser,
    deleteUser,
    updateUser
}