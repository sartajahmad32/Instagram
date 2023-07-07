import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await axios.post("http://localhost:8080/api/login", {
          email,
          password,
        });
        console.log("Login successful");
        console.log(response.data);

        // Display success message
        alert("Login successful");

        // Navigate to the homepage
        navigate("/instagram"); // Replace '/instagram' with the path to your homepage component
      } catch (error) {
        console.log("Login failed:", error);
        setLoginError("Invalid credentials"); // Set the login error message
      }
    }
  };

  const disableLogin = !(email && password);

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>Email:</label>
        <input
          className="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          className="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleLogin} disabled={disableLogin}>
          Login
        </button>

        {loginError && <p>{loginError}</p>}

        <div>
          <button type="button" className="forgot">
            <Link to="/forgot">Forgot Password</Link>
          </button>
          <button type="button" className="signup">
            <Link to="/signup">Sign Up</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
