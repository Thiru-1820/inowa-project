import React from 'react';
import './LoginSignup.css';

function LoginSignup() {
  return (
    <div className="login-signup-page">
      <div className="login-box">
        <h2>Login / Signup</h2>
        <form>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginSignup;
