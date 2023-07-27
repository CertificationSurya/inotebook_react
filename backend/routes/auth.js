const express = require("express")
const User = require("../models/User")
const router = express.Router()
// express validation for data
const { body, validationResult } = require("express-validator")
// Logger File Import
const Logger = require("../Logger_and_Logs/Logger")


// Create a user using: POST "/api/auth/createuser". Doesn't require Auth
// starting after from index.js's app.use("/api/auth", require("./routes/auth"))
// usually "/" denotes root route but here it basically state root route('/') is /api/auth

router.post("/createuser",
    // express check at Posting process
    [
        // body('json data', invalid Message).checks()
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            // sends post req body to Schema for making model (ultimately data in DB)
            // checks if email already exist in mongoDb
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                // log the message (type-> error) to log file if email already exists.
                Logger.authLogger.error(`${req.body.email} already exists on our Database`)
                return res.status(400).json({ error: "Sorry a user with this email is already on our Database" })
            }

              user = await User.create({
                  name: req.body.name,
                  password: req.body.password,
                  email: req.body.email,
              }) // User is model object 
              res.json(user)
            //   log message to log file with data
              Logger.authLogger.verbose(`username: ${req.body.name} with ${req.body.email} was saved on Database`)
          
              
        } catch (error) {
            console.error(error.message)
            Logger.authLogger.error(`Couldn't create a user ${error.message}`)
            res.status(500).send("Some Error Occured in Server")
        }

    })
module.exports = router;