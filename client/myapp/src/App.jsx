import React from 'react'
import EmployeeForm from './components/EmployeeForm.jsx'
import Admin from './Pages/Admin.jsx'
import { Toaster } from 'react-hot-toast'
import {BrowserRouter , Route, Routes} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <div>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<EmployeeForm />} />
        <Route path="/my-admin" element={<Admin />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
