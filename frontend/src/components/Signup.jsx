import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"


const Signup = () => {
    const [errorMsg, setErrorMsg] = useState("")

    const [credentials, setCredentials] = useState({ name: '', email: '', password: "", cpassword: "" })
    let navigate = useNavigate()

    // when email/password/username/confirm password gets changed,
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    // when user click on login, 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials

        // ..informative alert [To Be Deleted]
        if (cpassword !== password) {
            setErrorMsg("Your password Doesn't match with confirmation")
            setTimeout(() => {
                setErrorMsg("")
            }, 2000)
            return
        }

        // send POST request which'll give back auth-token (JWT)
        const response = await fetch("http://localhost:8080/api/auth/createuser", {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })

        const json = await response.json()
        console.log(json)

        if (json.success) {
            // if user was logged in, save auth-token and redirect
            localStorage.setItem('token', json.authToken)
            // push user to /("home")
            navigate('/')
        }
        else {
            alert("invald")
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="name" className="form-control" name='name' id="name" value={credentials.name} onChange={onChange} required />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} required />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' id="password" value={credentials.password} onChange={onChange} minLength={5} required />
            </div>

            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" name='cpassword' id="cpassword" value={credentials.cpassword} onChange={onChange} minLength={5} required />
            </div>
            <p>
                {errorMsg}
            </p>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Signup
