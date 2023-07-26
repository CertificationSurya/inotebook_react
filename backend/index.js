// entryPoint file

require('dotenv').config()

const connectToMongo = require('./db')
const express = require("express")

connectToMongo()

const app = express()
const PORT = process.env.PORT || 3000

// Available Routes
// app.use ("path", required("path to module to import"))

app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))

app.listen(PORT,()=>{
    console.log(`Your express app is On in the link http://localhost:${PORT}`)
})

