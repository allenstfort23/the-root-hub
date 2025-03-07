import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Loading from "./components/Animation/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import AboutUs from "./pages/About/AboutUs";
import Profile from "./pages/Profile/Profile";

import "./App.css";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setTimeout(() => setLoading(false), 3000); // Show loading screen for 3 seconds
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Router>
          <Navbar
            isAuthenticated={isAuthenticated}
            handleLogOut={handleLogOut}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route element={<ProtectedRoute />}>
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    isAuthenticated={isAuthenticated}
                    handleLogout={handleLogOut}
                  />
                }
              />
              <Route path="/profile/:userId" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
