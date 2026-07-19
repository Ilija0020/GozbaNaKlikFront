import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./features/auth/pages/WelcomePage";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Header from "./core/layout/Header/Header";
import Footer from "./core/layout/footer/Footer";
import ProtectedRoute from "./core/components/ProtectedRoute";
import CustomerHomePage from "./features/customer/pages/CustomerHomePage";
import OwnerHomePage from "./features/owner/pages/OwnerHomePage";
import EmployeeHomePage from "./features/employee/pages/EmployeeHomePage";
import CourierHomePage from "./features/courier/pages/CourierHomePage";
import AdminHomePage from "./features/admin/pages/AdminHomePage";
import RegisterByAdmin from "./features/admin/pages/RegisterByAdmin";
import UserList from "./features/admin/components/userList/UserList";
import "./core/global.scss";
import RestaurantList from "./features/admin/components/restaurantList/RestaurantList";
import UserContext from "./core/contexts/UserContext";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/customer/home"
                element={
                  <ProtectedRoute allowedRoles={["Customer"]}>
                    <CustomerHomePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/owner/home"
                element={
                  <ProtectedRoute allowedRoles={["Owner"]}>
                    <OwnerHomePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/employee/home"
                element={
                  <ProtectedRoute allowedRoles={["Employee"]}>
                    <EmployeeHomePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/courier/home"
                element={
                  <ProtectedRoute allowedRoles={["Courier"]}>
                    <CourierHomePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/home"
                element={
                  <ProtectedRoute allowedRoles={["Admin"]}>
                    <AdminHomePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute allowedRoles={["Admin"]}>
                    <UserList />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/register-user"
                element={
                  <ProtectedRoute allowedRoles={["Admin"]}>
                    <RegisterByAdmin />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/restaurants"
                element={
                  <ProtectedRoute allowedRoles={["Admin"]}>
                    <RestaurantList />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
};
export default App;
