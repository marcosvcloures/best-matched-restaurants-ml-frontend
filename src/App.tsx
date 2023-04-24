import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import MainPage from './pages/MainPage'

function App (): JSX.Element {
  return <BrowserRouter>
    <div className="App flex flex-column">
      <MainPage />
    </div>
  </BrowserRouter>
}

export default App
