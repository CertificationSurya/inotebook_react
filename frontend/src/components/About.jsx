// import context hook from react
import React from "react"
// import context
// import noteContext from "../context/notes/noteContext"

import notebookImage from "../assets/notebook.png";

const About = () => {

    return (
        <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <h2>About Us - iNotebook App</h2>
                        <p>Welcome to iNotebook, your secure and reliable cloud-based note-taking app! At iNotebook, our mission is to provide you with a simple, efficient, and secure way to take notes and access them from anywhere. We understand the importance of organizing your thoughts and ideas, and that's why we've designed iNotebook to be your ultimate digital companion.</p>
                        <p>Your data security is our top priority. With iNotebook, you can store your notes in the cloud with complete peace of mind. We use state-of-the-art encryption and security measures to ensure that your notes are protected from unauthorized access. Your data is stored in secure servers, and we never compromise on the privacy of your information.</p>
                    </div>
                    <div className="col-lg-6">
                        <img src={notebookImage} alt="iNotebook App" className="img-fluid" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
