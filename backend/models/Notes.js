// for models
const mongoose = require('mongoose');

// creating a UserSchema
const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
})

// mongoose.model will make a new model, ("model_name", "Schema")
module.exports = mongoose.model('notes',NotesSchema);