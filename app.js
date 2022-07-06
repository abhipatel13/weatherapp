
const express = require("express");
require('./models/signup');
require("dotenv").config();
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
var hbs = require('hbs');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const auth = require("./middleware/auth");
const { networkInterfaces } = require("os");
const Signup = mongoose.model('Signup');



const staticPath = path.join(__dirname, "/public");
const templatePath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");


app.use(express.static(staticPath));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialsPath);


// register path to partials
hbs.registerPartials(partialsPath);


app.get("/",auth, (req, res) => {
 res.render('index');
});

app.get("/login", (req, res) => {
  res.render("login");
})

app.post("/login", async(req, res) => {
 
   try{

    const email = req.body.email;
    const password = req.body.password;
    const useremail = await Signup.findOne({email:email});
    const isMatch = await bcrypt.compare(password,useremail.password);

    const token = await useremail.generateAuthToken();    

    res.cookie("jwt",token,{
      expires : new Date(Date.now()+300000),
      httpOnly : true , 
      // secure : true
     });

    if(isMatch)
    {
      res.status(201).render("index");
      
    }else {
      res.render('login',{err : "Invalid Email or Password"})
    }
      
   }catch(err){
    res.render('login',{err : "Invalid Email or Password"})
   }
});



app.get("/register", (req, res) => {
  res.render("register");
})

app.get("/logout",auth,async(req,res)=>{
  try{
    res.clearCookie("jwt");
    res.render("login"); 
  }
  catch(err)
  {
    res.send(500).send(error);
  }
})
app.post("/register",async(req, res) => {
  try {
    if (req.body && req.body.email && req.body.password) {

      Signup.find({ email: req.body.email },  async(err, data) => {

        if (data.length == 0) {

          const registerUser = new Signup({
            name : req.body.name,
             email: req.body.email,
            password: req.body.password
          });
          
     
          const token = await registerUser.generateAuthToken();
      
          //  res.cookie("jwt",token,{
          //   expires : new Date(Date.now()+300000),
          //   httpOnly : true
          //  });
          const registered = await registerUser.save();
          res.status(201).render('login');

        } else {
          res.status(400).send({
            errorMessage: 'Email Already Exist!',
            status: false
          });
        }

      });

    } else {
      res.status(400).send({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});

app.get("/weather",auth, (req, res) => {

  // console.log(`This is The Cookie = ${req.cookies.jwt}`);
  res.render("weather");


})

app.get("/about",auth, (req, res) => {
  res.render("about");
})
app.get("*", (req, res) => {
  res.redirect("/");
})



app.listen(port, () => {
  console.log("App listening Successfully");
})

