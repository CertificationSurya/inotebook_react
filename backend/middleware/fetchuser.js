require('dotenv').config()
const jwt = require('jsonwebtoken')
const Logger = require("../Logger_and_Logs/Logger")

const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to res
    const token = req.header("auth-token");

    if (!token) {
        Logger.tokenLogger.error(`User with invalid token Found`)
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        // gets verified with secret signature and retrieves {id and iat}
        const data = jwt.verify(token, JWT_SECRET)
        // from data, extract {id} and store in a user('a on-the-fly variable')
        req.user = data.user;
        // run other commands. in this case auth.js 3rd Route
        next();
        
    } catch (error) {
        Logger.tokenLogger.error(`User with invalid token Found`)
        res.status(401).send({ error: "Please authenticate using a valid token"})
    }
}

module.exports = fetchuser;