const express = require("express")
const User = require("../models/User")
const router = express.Router()
require("dotenv").config()

// express validation for data
const { body, validationResult } = require("express-validator")
// Logger File Import
const Logger = require("../Logger_and_Logs/Logger")

// hashing package
const bcrypt = require("bcryptjs")

const jwt = require('jsonwebtoken')
const fetchuser = require("../middleware/fetchuser")


// will receive signature token from .env to sign with jsonwebtoken
const JWT_SECRET = process.env.JWT_SECRET

// Create a user using: POST "/api/auth/createuser". Doesn't require Auth
// starting after from index.js's app.use("/api/auth", require("./routes/auth"))
// usually "/" denotes root route but here it basically state root route('/') is /api/auth

// Route - 1. Create User
router.post("/createuser",
    // express check at Posting process
    [
        // body('json data', invalid Message).checks()
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    ], async (req, res) => {

        let success = false;

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
                return res.status(400).json({success, error: "Sorry a user with this email is already on our Database" })
            }

            // salt, hashing on password and storing on secPass variable which is send as password in Database 
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            }) // User is model object 

            //   For signing Jwt Token
            const data = {
                user: {
                    id: user.id
                }
            }
            // signing data (user id in this case) with my secret key
            const authToken = jwt.sign(data, JWT_SECRET);
            
            success = true;

            res.json({success, authToken }) // es6 fo res.json(authToken: authToken)

            //   log message to log file with data
            Logger.authLogger.verbose(`username: ${req.body.name} with ${req.body.email} was saved on Database`)
        }

        catch (error) {
            console.error(error.message)
            Logger.authLogger.error(`Couldn't create a user. Error ->  ${error.message}`)
            res.status(500).send("Internal Server error occured!")
        }

    })


// Route - 2
// Authenticate a user using : POST "/api/auth/login"
router.post("/login",
    [
        body("email", "Enter a valid email").isEmail(),
        // exists() checks if it's null/undefined/empty or no
        body("password", "Password can't be blank").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            let success = false
            if (!user) {
                Logger.authLogger.warn(`Ghost email address -> ${email}`)
                return res.status(400).json({success,  error: "Please try to login with correct credentials" })
            }
            // compares user password (auto convert to hash by bcrypt.compare) with hashed form of password in Database
            const passwordCompare = await bcrypt.compare(password, user.password)
            // password not match?
            if (!passwordCompare) {
                Logger.authLogger.warn(`Wrong Password by email -> ${email}`)
                return res.status(400).json({success,  error: "Please try to login with correct credentials" })
            }

            // password yes match
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET)
            
            success = true;
            res.json({ success,  authtoken })

        }
        catch (error) {
            Logger.authLogger.error(`server error and couldn't process request -> ${req.body}`)
            return res.status(500).json({ error: "Internal Server error occured!" })

        }
    })


// Route - 3 : Get Loggedin User Details using: POST "/api/auth/getuser". Login Required
// "fetchuser" is the middleware which gets executed in interval of server request sent and server response sent
router.post("/getuser", fetchuser, async (req, res) => {
    
  // "fetchuser" [a middleware] gets executed beforehand of getting here.
    try {
        // get user id from token (extraction performed by middleware [fetchuser])
        const userId = req.user.id;
        // find user id and select all but password. findById(), select() are both queries of MongoDb
        const user = await User.findById({ _id: userId }).select("-password")
        res.send(user)

    } catch (error) {
        console.error(error.message);
        Logger.tokenLogger.error(`server error While Authentication of User`)
        res.status(500).send("Internal Server Error Occured!")
    }
})

module.exports = router;

