// for Schema
const mongoose = require('mongoose');

// creating a UserSchema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        // unique: true ensures email will be different
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

// mongoose.model will make a new model, ("model_name {collections}", "Schema")
const User = mongoose.model('user',UserSchema);
// makes indexes of queries {in this case email as it is unique} which will boost queries and performance of app
// User.createIndexes()
module.exports = User;