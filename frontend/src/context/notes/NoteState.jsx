import react, { useContext } from "react"
// importing created context
import NoteContext from "./noteContext"
import { useState } from "react"

// creating a function which will provide state to all heirarchy
const NoteState = (props)=>{ 
    const notesInitial = [
        {
          "_id": "64c3a58a2d7343ed13e88c572",
          "user": "64c2b2f6d68ff1d802343e42",
          "title": "I am a title",
          "description": "Please wake up early",
          "tag": "Personal",
          "date": "2023-07-28T11:24:58.255Z",
          "__v": 0
        },
        {
          "_id": "64c3a5ba3e0125ff43c81d96f",
          "user": "64c2b2f6d68ff1d802343e42",
          "title": "A title",
          "description": "Please wake up early",
          "tag": "Personal",
          "date": "2023-07-28T11:25:46.098Z",
          "__v": 0
        },
        {
          "_id": "64c3a5ba35e025ff43c81d96f",
          "user": "64c2b2f6d68ff1d802343e42",
          "title": "A daf",
          "description": "Please wake up early",
          "tag": "Personal",
          "date": "2023-07-28T11:25:46.098Z",
          "__v": 0
        },
        {
          "_id": "64c3a5ba34e025ff43c81d96f",
          "user": "64c2b2f6d68ff1d802343e42",
          "title": "A titfale",
          "description": "Please wake up early",
          "tag": "Personal",
          "date": "2023-07-28T11:25:46.098Z",
          "__v": 0
        }
      ]

     
      const [notes, setNotes] = useState(notesInitial)

    return(
        // we'll be wraping elements in app.jsx for which we'll need data/value
        
        // any data/value that you want to sent as context goes under "value" (below line)
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;