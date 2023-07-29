import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

import { Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";

import NoteState from './context/notes/NoteState';

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
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
          </Routes>
      </NoteState>
    </>
  )
}
