import react from "react"
// importing created context
import NoteContext from "./noteContext"
import { useState } from "react"

// creating a function which will provide state to all heirarchy
const NoteState = (props)=>{ 
    const s1 = {
        "name": "initialVal",
        "class": "5b"
    }
    const [state, setState] = useState(s1)

    const update = () => {
            setTimeout(()=>{
              setState({
                "name": "UpdatedUsingContext",
                "class" : "10b"
              }) 
            }, 1000)
        }
    
    return(
        // we'll be wraping elements in app.jsx for which we'll need data/value
        
        // any data/value that you want to sent as context goes under "value" (below line)
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;