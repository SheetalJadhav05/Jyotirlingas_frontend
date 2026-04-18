import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboards
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

// 🔥 Inhe import karna zaroori hai
import ManagePost from "./pages/ManagePost";
import ChangePassword from "./pages/ChangePassword";
function App() {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Dashboard & Sub-routes */}
        <Route path="/dashboard" element={<UserDashboard />} />

        {/* 🔥 Yeh routes add karein taaki blank screen na aaye */}
        <Route path="/dashboard/manage-post" element={<ManagePost />} />
        <Route path="/dashboard/change-password" element={<ChangePassword />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
