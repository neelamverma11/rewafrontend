import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EditProfile from './components/EditProfile';
import ChangePassword from './components/ChangePassword';
import SignIn from './components/SignInPage';
import SignUp from './components/SignUpPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('userDetail');
      return !!token;
    };
    setIsAuthenticated(checkAuthentication());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit-profile/:id" element={<EditProfile />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </>
        ) : null}
      </Routes>
    </Router>
  );
};

export default App;
