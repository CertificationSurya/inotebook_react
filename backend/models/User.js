// for Schema
const mongoose = require('mongoose');

// creating a UserSchema
const UserSchema = new Schema({
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

// mongoose.model will make a new model, ("model_name", "Schema")
module.exports = mongoose.model('user',UserSchema);