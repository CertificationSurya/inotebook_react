import React from 'react'

const Noteitem = (props) => {
    // destructured to get note | i could also use props.note if not destructured
    const { note } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex justify-content-center ali">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="far fa-trash-alt mx-2"></i>
                        <i className="far fa-edit mx-2"></i>
                    </div>

                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem;
