const express=require('express');
const router=express.Router();

//getting schema
const User=require('../models/user');

//requiring all functions
const userController = require('../controllers/user');

//GET ALL USERS
router.get("/", userController.findUsers  );

router.get("/new",userController.newUser);

//ADD NEW USER
router.post('/',userController.addUser )

//SPECIFIC USER
router.get('/edit/:userId',userController.findSpecificUser)

//DELETE USER
router.delete('/:userId',userController.deleteUser);

//UPDATE USER
router.put('/:userId',userController.updateUser)


module.exports = router;