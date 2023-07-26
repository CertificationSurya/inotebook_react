const express = require("express")
const router = express.Router()

// starting after from index.js's app.use("/api/auth", require("./routes/auth"))
// usually "/" denotes root route but here it basically state root route('/') is /api/auth
// NOTE: "router.get" instead of 'app.get'
router.get("/",(req,res)=>{
    
    res.json([])
})

module.exports = router