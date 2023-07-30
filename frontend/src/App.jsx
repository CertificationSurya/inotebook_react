import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

import { Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/login';


// Create router
const router = createBrowserRouter([
  { path: "*", Component: Root },
]);


export default function App() {
  return <RouterProvider router={router} />;
}


function Root() {
  // alert state variable
  const [alert, setAlert] = useState(null)

  const showAlert = (message,type)=>{
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(()=>{
      setAlert(null);
    },1500)
  }


  return (
    <>
      {/* NoteState is place as wrapper so that all variable in note */}
      <NoteState showAlert={showAlert}>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
          
          <Routes>
            <Route exact path='/' element={<Home showAlert={showAlert}/>} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/login' element={<Login showAlert={showAlert} />} />
            <Route exact path='/signup' element={<Signup showAlert={showAlert} />} />
          </Routes>

        </div>

      </NoteState>
    </>
  )
}
