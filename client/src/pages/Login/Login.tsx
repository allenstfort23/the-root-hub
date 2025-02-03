import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert(data.message);
      setUsername("");
      setPassword("");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <h1>The Root Hub</h1>
      <div className="login-container">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Log In</h5>
            <p className="card-text">Sign in to explore and share.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">
                Log In
              </button>
            </form>
            <p>
              <small>New Here?</small>
            </p>
            <button className="btn btn-secondary">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
