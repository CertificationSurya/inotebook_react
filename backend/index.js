// entryPoint file

require('dotenv').config()

const connectToMongo = require('./db')
const express = require("express")

connectToMongo()

const app = express()
const PORT = process.env.PORT || 3000

app.get("/",(req, res)=>{
    res.send("Hello world")
})

app.listen(PORT,()=>{
    console.log(`Your express app is On in the link http://localhost:${PORT}`)
})

