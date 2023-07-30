import React, { useContext } from 'react'
// importing context
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const context = useContext(noteContext)

    const { deleteNote } = context;

    // destructured to get note | i could also use props.note if not destructured
    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <span className="badge rounded-pill text-bg-success position-absolute bottom-0 end-0" >{note.tag}</span>
                    <span className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2"><span className="visually-hidden">{note.tag}</span></span>

                    <div className="d-flex justify-content-center ali">
                        <h5 className="card-title">{note.title}</h5>
                        {/* when onClicked on delete icon, send the id of the note to be deleted in the "deletenote" function */}
                        <i className="far fa-trash-alt mx-2" onClick={() => deleteNote(note._id)}></i>

                        {/* When a user click on edit icon, it triggers updateNote function which will open a modal with respective value */}
                        <i className="far fa-edit mx-2" onClick={() => updateNote(note)}></i>
                    </div>

                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem;
