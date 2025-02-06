import React from 'react'
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Hedder'
import Footer from './components/Fotter'
import Reports from './pages/Reports'
import NotFound from './pages/NotFound'
import ReportDownload from './components/REportDownload'

const App = () => {
  
  return (
    <div>
      <Router>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Reports' element={<Reports/>}/>
          <Route path='/Report/:place' element={<ReportDownload/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      <Footer/>
      </Router>
  
    </div>
  )
}

export default App
