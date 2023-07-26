const express = require("express")
const User = require("../models/User")
const router = express.Router()
// express validation for data
const { body , validationResult } = require("express-validator")

// Create a user using: POST "/api/auth/". Doesn't require Auth
// starting after from index.js's app.use("/api/auth", require("./routes/auth"))
// usually "/" denotes root route but here it basically state root route('/') is /api/auth
router.post("/",
// express check at Posting process
// body('json data', invalid Message).checks()
[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
] ,(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }

    // sends post req body to Schema for making model (ultimately data in DB)
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      }) // user is model object 
      .then(user => {
        res.json(user)
        console.log(user)
    })
      .catch(err=> {
        console.log(err)
        res.json({error: 'Please enter a unique value for email', message: err.message})})
      })
module.exports = router;