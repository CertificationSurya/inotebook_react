// import context hook from react
import React, { useContext, useEffect } from "react"
// import context
import noteContext from "../context/notes/noteContext"


const About = () => {

    // using a context named "noteContext" to access value declared in it.
    const a = useContext(noteContext)


    useEffect(() => {
        a.update()
        // eslint-disabled-next-line
    }, [])

    return (
        <div>
            this is {a.state.name} and class {a.state.class}
          
        </div>
    )
}

export default About
