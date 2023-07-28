const express = require("express")
const router = express.Router()
// importing middleware
const fetchuser = require("../middleware/fetchuser")
const Note = require("../models/Note")
const { body, validationResult } = require("express-validator")
//Logger import
const Logger = require("../Logger_and_Logs/Logger")


// usually "/" denotes root route but here it basically state root route('/') is /routes/notes
// NOTE: "router.get" instead of 'app.get'

// Route -1 : Get All the Notes using Get "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try{
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    }
    catch(error){
        Logger.noteLogger.error(`Internal Error Occured While fetching notes of ${req.user.id}`);
        res.status(500).send("Internal error Occured")
    }
})


// Route - 2 : Add a new note using POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 })
],
    async (req, res) => {
        try {
            // get error on validation to errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                Logger.noteLogger.error(`Error in adding new note`)
                return res.status(400).json({ errors: errors.array() })
            }
            //gets title, description and tag from req.body
            const { title, description, tag } = req.body
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            // save note to DB 
            const savedNote = await note.save()
            res.json(savedNote)

        }
        catch (error) {
            Logger.noteLogger.error(`Internal Error Occured While Creating note of ${req.user.id}`);
            res.status(500).send("Internal error Occured")
        }

    })


module.exports = router