const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/WEATHER_DATABASE',(err)=>{
    if(!err){
        console.log("MongoDB Connection Succeeded");
    }
    else {
        console.log("Error in DB Connection "+err);
    }
});

require('./signup');