import { useState } from 'react'
import Todolist from './components/Todolist'
import Editpage from './components/Editpage'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {

  return (
    <>
     <div className="h-screen overflow-y-auto">
      <BrowserRouter>
        <Navbar /> 
          <Routes>
            <Route path="/" element={<Todolist/>} />
            <Route path="/createtask" element={<Editpage/>} />
            <Route path="/task/edit/:id" element={<Editpage/>} />
          </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
