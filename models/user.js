const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config=require("config");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  wallet_address: {
    type: String,
    required: true,
  }
});


function generateToken(user) {
  const payload = {
    _id: user._id,
    email: user.email_address,
    username: user.username
  };
  return jwt.sign(payload, config.get("jwtPrivateKey"), {
    expiresIn: '1h' 
  });
}

userSchema.methods.generateAuthToken = function() {
  const token = generateToken(this);
  return token;
}

const validateUser=(req)=>{
    const userValidationSchema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        wallet_address: Joi.string().required()
      });
     return userValidationSchema.validate(req);
}
  
const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  validateUser
};
