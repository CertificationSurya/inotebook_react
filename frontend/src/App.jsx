import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

import { Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";

// Create router
const router = createBrowserRouter([
  { path: "*", Component: Root },
]);


export default function App() {
  return <RouterProvider router={router} />;
}


function Root() {
  return (
    <>
      {/* NoteState is place as wrapper so that all variable in note */}
      <NoteState>
        <Navbar />
        <Alert message={"I am vengence"}/>
        <div className="container">
          
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
          </Routes>

        </div>

      </NoteState>
    </>
  )
}
