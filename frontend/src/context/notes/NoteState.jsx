import react, { useContext } from "react"
// importing created context
import NoteContext from "./noteContext"
import { useState } from "react"

// creating a function which will provide state to all heirarchy
const NoteState = (props) => {
    // url for hitting API
    const host = "http://localhost:8080"

    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)


    // Get all Notes.
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjMmIyZjZkNjhmZjFkODAyMzQzZTQyIn0sImlhdCI6MTY5MDY0NDQ2M30.icd90tNivAkH6pxSvo_5CHw_u8IsBHnEm2t9L1pIft0"
            },
        })

        let json = await response.json()
        setNotes(json)

    }


    // Add a Note.
    // takes new note which includes (title, description, tag) from API call and using setter function, push it to "notes" state 
    const addNote = async ({ title, description, tag }) => {

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjMmIyZjZkNjhmZjFkODAyMzQzZTQyIn0sImlhdCI6MTY5MDY0NDQ2M30.icd90tNivAkH6pxSvo_5CHw_u8IsBHnEm2t9L1pIft0"
            },
            // body will be object with title: titleVal, description: descriptionVal, tag: tagVal
            body: JSON.stringify({ title, description, tag })
        })

        const savedNote = await response.json()

        setNotes([savedNote, ...notes])
        
    }

    // Delete a Note
    const deleteNote = async (id) => {
        // API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjMmIyZjZkNjhmZjFkODAyMzQzZTQyIn0sImlhdCI6MTY5MDY0NDQ2M30.icd90tNivAkH6pxSvo_5CHw_u8IsBHnEm2t9L1pIft0"
            }
        })

        // const json = response.json();

        // setNotes(previous note without note with arguement id )
        const newNotes = notes.filter(note => note._id !== id)
        setNotes(newNotes)
    }


    // Edit a Note
    // get "_id" and rename it to "id"
    const editNote = async ({ _id: id, title, description, tag }) => {
        

        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjMmIyZjZkNjhmZjFkODAyMzQzZTQyIn0sImlhdCI6MTY5MDY0NDQ2M30.icd90tNivAkH6pxSvo_5CHw_u8IsBHnEm2t9L1pIft0"
            },
            body: JSON.stringify({ title, description, tag })
        })

        const json = await response.json();
        // for client side changing in data without server fetch
        let newNotes = JSON.parse(JSON.stringify(notes))


        // Logic to edit in client side
        // By harry. first takes all data in newNotes, then iterate over data to find modified data and then change it as well as exit the loop. Meaning save unnecessary time consumption. Beneficial if the element is closer to start.
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }

        setNotes(newNotes)
    }

    return (
        // we'll be wraping elements (NoteState) in app.jsx for which we'll need data/value

        // any data/value that you want to sent as context goes under "value" (below line)
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;