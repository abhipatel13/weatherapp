const jsonwt = require("jsonwebtoken");

// const Register = require('../models/signup');
const mongoose = require("mongoose");
const Register = mongoose.model('Signup');
const auth = async(req,res,next)=>{

  try{
  const token = req.cookies.jwt;
  console.log(token);
  const verifyUser = jsonwt.verify(token,process.env.SECRET);
  const user = await Register.findOne({_id : verifyUser._id});
  // console.log(user.name);
  next();
  }
  catch(err){
     res.render('login')
  }

}

module.exports = auth;