import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/register`, {
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
            <h5 className="card-title">Sign Up</h5>
            <p className="card-text">
              Create an account to join the community.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="First Name"
                value={username}
                minLength={4}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={username}
                minLength={4}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={username}
                minLength={4}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Username"
                value={username}
                minLength={4}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-login">
                Sign Up
              </button>
            </form>
            <button className="btn btn-secondary">
              <Link to="/login">Log In</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
