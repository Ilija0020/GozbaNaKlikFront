import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import WelcomePage from "./features/auth/pages/WelcomePage"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Header from "./core/layout/Header/Header"
import Footer from "./core/layout/Footer/Footer"
import "./core/global.scss"

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
export default App