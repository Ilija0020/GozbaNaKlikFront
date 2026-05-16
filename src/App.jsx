import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import WelcomePage from "./features/auth/pages/WelcomePage"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"

// Importujemo komponente iz novih foldera
import Header from "./core/layout/Header/Header"
import Footer from "./core/layout/Footer/Footer"
import "./core/global.scss"

const App = () => {
  return (
    // Dodali smo div sa minHeight: 100vh da bi Footer uvek bio gurnut na samo dno ekrana,
    // čak i ako stranica nema dovoljno sadržaja. Ovo je klasičan frontend trik!
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}> {/* Dodat flex da bi hero popunio preostali prostor */}
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
}
export default App