import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'


const AddNote = () => {
    // get context and from all values & method retrieve "addNote" method only
    const context = useContext(noteContext)
    const {addNote } = context

    // state for note
    const [note, setNote] = useState({title: '', description:'', tag: ''}) 

    // when new note is submitted
    const handleClick = (e)=>{
        e.preventDefault()
        addNote(note)
    }
    
    // when changes is seen in new note, reflect it in state
    const onChange =(e)=>{
        // setNote (...note) -> create a shallow copy of the note object i.e {title: '', description:'', tag: ''}
        // But
        // [e.target.name] targets name attribute i.e -> {name='title'} : e.target.value {values in input field}, will add (if it's not title/description/tag) or update if it is.
        setNote({...note, [e.target.name] : e.target.value})
    }

    return (
        <div className="container my-3">
            <h1>Add a Note</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp"  onChange={onChange}/>
                    
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
                </div>

                <button type="button" className="btn btn-primary" onClick={ handleClick}>Add Note</button>
            </form>
        </div>

    )
}

export default AddNote;
