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
  age: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports=mongoose.model('users',UserSchema)