require('dotenv').config()

const mongoose = require('mongoose');

// mongoDB connection uri from mongodb compass
const mongoURI = process.env.mongoURI
// was trying "localhost" instead of "127.0.0.1" but seemed like i configured it for IpV4 (127.0.0.1) not ipV6

// func to connect to mongo
const connectToMongo = async() =>{
    try {
        // mongoose.set("strictQuery", false);
        mongoose.connect(mongoURI).then(()=>{
            console.log("Connected to mongoDB successfully");
        })
      } 
      catch (error) {
        console.log(error);
        process.exit();
      }
    
}

// exporting function in common js
module.exports = connectToMongo;
