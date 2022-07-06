const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require('dotenv').config;
require('./db');
const jwt = require("jsonwebtoken");
var registerschema = new mongoose.Schema({
   name : {
    type : String
   }
   ,
   email : {
    type : String
   },
   password : {
    type : String
   },
   tokens :[{
     token : {
      type : String,
      required : true
     }  
   }

   ]
});

registerschema.methods.generateAuthToken = async function(){
   try{
   const token = await jwt.sign({_id:this._id.toString()},process.env.SECRET);
   this.tokens = this.tokens.concat({token});
   await this.save();
   return token;
 }
 
   
   catch(err)
   {
    console.log(err);
   }
}

registerschema.pre("save",async function(next){
   if(this.isModified("password")){
      // const passwordHash = await bcrypt.hash(password,10);
      this.password = await bcrypt.hash(this.password,10);
   }
   next();
})
mongoose.model('Signup',registerschema);


