const mongoose=require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/, //adding some validations to email
    unique: true, //email must be unique
  },
  bio: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports=mongoose.model('users',UserSchema)