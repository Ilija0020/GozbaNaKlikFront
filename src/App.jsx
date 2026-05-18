import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import WelcomePage from "./features/auth/pages/WelcomePage"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Header from "./core/layout/Header/Header"
import Footer from "./core/layout/Footer/Footer"
import ProtectedRoute from "./core/components/ProtectedRoute"
import CustomerHomePage from "./features/customer/pages/CustomerHomePage";
import OwnerHomePage from "./features/owner/pages/OwnerHomePage";
import EmployeeHomePage from "./features/employee/pages/EmployeeHomePage";
import CourierHomePage from "./features/courier/pages/CourierHomePage";
import AdminHomePage from "./features/admin/pages/AdminHomePage";
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
            <Route path="/customer/home" element={
            <ProtectedRoute allowedRoles={["Customer"]}>
              <CustomerHomePage />
                </ProtectedRoute>
                  } />
            <Route path="/owner/home" element={
                <ProtectedRoute allowedRoles={["Owner"]}>
                  <OwnerHomePage />
                  </ProtectedRoute>
                  } />
            <Route path="/employee/home" element={
                <ProtectedRoute allowedRoles={["Employee"]}>
                  <EmployeeHomePage />
                  </ProtectedRoute>
                  } />
            <Route path="/courier/home" element={
                <ProtectedRoute allowedRoles={["Courier"]}>
                  <CourierHomePage />
                  </ProtectedRoute>
                  } />
            <Route path="/admin/home" element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminHomePage />
                  </ProtectedRoute>
                  } />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
export default App