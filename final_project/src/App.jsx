import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <div>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
      </Route>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
