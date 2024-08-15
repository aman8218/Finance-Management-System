import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Components/Home/Home";
import SignupForm from "./Components/Signup/SignUpForm";
import LoginForm from "./Components/Login/LoginForm";
import Dashboard from './Components/Dashboard/Dashboard';
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ForgotPassword from "./Components/PasswordReset/ForgotPassword";
import ResetPassword from "./Components/PasswordReset/ResetPassword";
import EditUser from "./Components/User/EditUser";

const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route element={<ProtectedRoute/>}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoute/>}>
          <Route path="/edit-user-info" element={<EditUser />} />
        </Route>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default PageRoutes;
