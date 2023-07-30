import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [credentials, setCredentials] = useState({email: '', password: ''})

    // in Version 5 useHistory hook to redirect user. in version 6 useNavigate
    let navigate = useNavigate()

    // when email/password gets changed,
    const onChange =(e)=>{
        // setCredentials(inObject form (past credential value, triggered value update))
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }


    // when user click on login, 
    const handleSubmit = async(e) =>{
        e.preventDefault();
        // send POST request which'll give back auth-token (JWT)
        const response = await fetch("http://localhost:8080/api/auth/login",{
            method: "POST",
            headers:{
                'Content-type': "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        })

        const json = await response.json()
        console.log(json)

        if(json.success){
            // if user was logged in, save auth-token and redirect
            localStorage.setItem('token', json.authtoken)
            // push user to /("home")
            navigate('/')
        }
        else{
            alert("invald")
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' id="password" value={credentials.password} onChange={onChange}/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Login
