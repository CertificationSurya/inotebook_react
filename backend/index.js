// entryPoint file

require('dotenv').config()

const connectToMongo = require('./db')
const express = require("express")

const cors = require('cors')

connectToMongo()

const app = express()
const PORT = process.env.PORT || 8080

// using cors to prevent from request blockage from client-side.
app.use(cors())
// NOTE: When you deploy an application on the server, you should not accept requests from every domain. Instead, you should specify which origin can make requests to your server. This way, you are able to block users who attempt to clone your site or make requests from an unauthorized servers. This is important an security measure.

// middleware to handle json request sent by sender-end to server-end
app.use(express.json())

// Available Routes
// app.use ("path", required("path to module to import"))

app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))

app.listen(PORT,()=>{
    console.log(`Your express app is On in http://localhost:${PORT}`)
})

