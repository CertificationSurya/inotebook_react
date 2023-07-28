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
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    }
    catch (error) {
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


// Route - 3 : Update a new note using Put "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser,
    async (req, res) => {

        //gets title, description and tag from req.body
        const { title, description, tag } = req.body

        // Create a newNote Object
        const newNote = {};

        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Find the note that gonna be updated and update it.
        let note = await Note.findById(req.params.id)
        // note doesn't exists?
        if(!note){
            Logger.noteLogger.error(`Note id -> ${req.params.id} Not found `);
            return res.status(404).send("Not Found")
        }

        // note is in database.
        // if [note.user] (id for reference to the user, which was saved while creating note) !== [req.user.id] (id retrieved from token by the middleware "fetchuser")
        if(note.user.toString() !== req.user.id){
            Logger.noteLogger.warn(`UnAuthorised access to someone else's note by the user ${req.user.id}` );
            return res.status(401).send("Not Allowed")
        }

        try {
            note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
            return res.json({note})
        }
        catch (error) {
            Logger.noteLogger.error(`Internal Error Occured While Upda note of ${req.user.id}`);
            return res.status(500).send("Internal error Occured")
        }

    })

// Route - 4 : Detete an existing note using DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser,
    async (req, res) => {
      
        // find the note to be deleted and delete it.
        let note = await Note.findById(req.params.id)
        // note doesn't exists?
        if(!note){
            Logger.noteLogger.error(`Note id-> ${req.params.id} for Deletion, Not found `);
            return res.status(404).send("Not Found")
        }

        // if (note to be deleted owner id) !== (delete-request-sending-user's id)
        if(note.user.toString() !== req.user.id){
            Logger.noteLogger.warn(`UnAuthorised delete approach to someone else's note by the user ${req.user.id}` );
            return res.status(401).send("Not Allowed")
        }

        try {
            // find note and delete and then send a json with success key and the deleted note.
            note = await Note.findByIdAndDelete(req.params.id)
            return res.json({"Success": "Note Has been deleted", note: note})
        }
        catch (error) {
            Logger.noteLogger.error(`Internal Error Occured While Upda note of ${req.user.id}`);
            return res.status(500).send("Internal error Occured")
        }

    })


module.exports = router