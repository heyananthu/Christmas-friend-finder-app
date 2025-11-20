import React from 'react'
import EmployeeForm from './components/EmployeeForm.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <EmployeeForm />
    </div>
  )
}

export default App
