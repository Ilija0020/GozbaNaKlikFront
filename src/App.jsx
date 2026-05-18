import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import WelcomePage from "./features/auth/pages/WelcomePage"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Header from "./core/layout/header/Header"
import Footer from "./core/layout/footer/Footer"
import "./core/global.scss"
import RegisterByAdmin from "./features/auth/pages/RegisterByAdmin"
import UserList from "./features/admin/components/userList/UserList"

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
            <Route path="/register-by-admin" element={<RegisterByAdmin />} />
            <Route path="/admin/users" element={<UserList />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
export default App