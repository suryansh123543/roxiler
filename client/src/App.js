import React from 'react'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Home from './Components/Home'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Navigate to = '/home'/>} />
          <Route path='/home' element = {<Home/>}/> 
        </Routes>  
      </BrowserRouter>
    </div>
  );
}

export default App;
