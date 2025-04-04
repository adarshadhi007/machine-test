import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/signin.css";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  
  const isValidPassword = (password) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (username.length < 8) {
      setError("Username must be at least 8 characters.");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must be at least 8 characters long and include at least 1 capital letter, 1 number, and 1 symbol.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      dispatch(login());
      alert("Logged in successfully!");
      setLoading(false);
      navigate("/home");
    }, 1000);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="auth-card d-flex p-4  rounded">
        <div className="form-container p-4 w-50">
          <h3 className="auth-title">Sign In</h3>
          <p className="text-muted">
            New user? <a href="#">Create an account</a>
          </p>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="keepSignedIn" />
              <label className="form-check-label" htmlFor="keepSignedIn">
                Keep me signed in
              </label>
            </div>
            <button type="submit" className="btn btn-dark w-100 mt-3" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <div className=" signin-bottom">
            <div className="position-relative text-center my-4 d-flex align-items-center justify-content-center signup-container">
              <hr className="flex-grow-1 me-2 signup-line1" />
              <span className="signin-text"> or Sign In with</span>
              <hr className="flex-grow-1 ms-2 signup-line2" />
            </div>
            <div className="d-flex justify-content-center gap-3 my-2">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={30} className="text-primary" /></a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={30} className="text-info" /></a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin size={30} className="text-primary" /></a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube size={30} className="text-danger" /></a>
            </div>
          </div>
        </div>

        <div className="illustration w-50 d-flex align-items-center justify-content-center position-relative">
          <img className="person-icon" src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png" alt="Person" />
          <img className="key-icon" src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Key" />
        </div>
      </div>

    </div>
  );
};

export default SignIn;
