import React, { useContext, useEffect, useRef, useState } from 'react'
// useRef hook basically gives reference to an element

// importing created context
import noteContext from "../context/notes/noteContext"
import Noteitem from './NoteItem'
import AddNote from './AddNote'


const Notes = () => {
    // take notes and other values & methods received from useContext(contentValue)
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context

    // when first time loaded, run getNotes function
    useEffect(() => {
            getNotes()
    }, [])

    // creating a reference with initial value as null, but later it refers to a button on modal which will trigger modal to on/off
    const ref = useRef(null)
    const refClose = useRef(null)

    // note variable to work with adding or updating note
    const [note, setNote] = useState({title: '', description:'', tag: ''}) 

    // For updating function
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote(currentNote)
    }
    
    // when new note is submitted
    const handleClick = (e)=>{
        editNote(note)
        refClose.current.click()
    }
    
    // when changes is seen in note, reflect it in state
    const onChange =(e)=>{
        setNote({...note, [e.target.name] : e.target.value})
    }


    return (
        <>
            <AddNote />

            {/* Modal when updating */}
            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" >
            </button>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input required={true} type="text" className="form-control" id="etitle" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5}/>

                                </div>

                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input required={true} type="text" className="form-control" id="edescription" name="description" value={note.description} onChange={onChange} minLength={5} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="tag" value={note.tag} onChange={onChange} />
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.title.length < 5 || note.description.length<5} onClick={handleClick} type="button" className="btn btn-primary" >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* notes display */}
            <div className="container row my-3">
                <h2>Your Notes</h2>
                {notes.length===0 && <div className="container">No notes to display, Create few Notes.</div>}
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes;