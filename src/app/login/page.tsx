"use client";

import React, { useState, useEffect } from "react";
import "./login.css";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { loginWithGoogle } = useAuth();
  const router = useRouter();
  
  const [activeForm, setActiveForm] = useState<"login" | "register" | "forgot">("login");
  const [passwordType, setPasswordType] = useState<"password" | "text">("password");
  const [regPasswordType, setRegPasswordType] = useState<"password" | "text">("password");

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const pointerX = e.clientX;
      const pointerY = e.clientY;
      const x = pointerX.toFixed(2);
      const y = pointerY.toFixed(2);
      const xp = (pointerX / window.innerWidth).toFixed(2);
      const yp = (pointerY / window.innerHeight).toFixed(2);
      document.documentElement.style.setProperty('--x', x);
      document.documentElement.style.setProperty('--xp', xp);
      document.documentElement.style.setProperty('--y', y);
      document.documentElement.style.setProperty('--yp', yp);
    };

    document.body.addEventListener('pointermove', syncPointer);
    return () => {
      document.body.removeEventListener('pointermove', syncPointer);
    };
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value.trim();
    
    if (email && password) {
      localStorage.setItem("loggedInUser", email);
      alert("✅ Login successful!");
      window.location.href = "/"; // Use window.location to trigger AuthContext full reload sync
    } else {
      alert("Please fill all fields.");
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Registration mock successful!");
    setActiveForm("login");
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Reset link sent!");
    setActiveForm("login");
  };

  return (
    <div className="wrapper">
      <div className="login-main">
        <article data-glow>
          <div className="form-container">

            {/* Login Form */}
            <div id="login-form" className={`form-section ${activeForm === "login" ? "active" : ""}`}>
              <h2>Login</h2>
              <form id="loginForm" onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-container">
                    <input type="email" id="email" name="email" required />
                    <i className="fas fa-at icon"></i>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-container">
                    <input type={passwordType} id="password" name="password" required />
                    <i 
                      className={`fas ${passwordType === "password" ? "fa-lock" : "fa-unlock"} eye-icon`} 
                      id="eye-icon" 
                      onClick={() => setPasswordType(prev => prev === "password" ? "text" : "password")}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </div>
                </div>

                <div className="remember-forgot">
                  <label><input type="checkbox" /> Remember me</label>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveForm("forgot"); }}>Forgot password?</a>
                </div>

                <div className="button-container">
                  <button className="button" type="submit">Login</button>
                </div>

                <div className="social-login" style={{ marginTop: "15px", textAlign: "center" }}>
                  <p style={{ color: "white", fontSize: "13px", marginBottom: "5px" }}>or continue with</p>
                  <div className="social-icons" style={{ marginTop: "5px", display: "flex", justifyContent: "center", gap: "15px" }}>
                    <div className="social-btn" title="Continue with Google" onClick={() => loginWithGoogle().then(() => { window.location.href = "/"; })}>
                      <i className="fab fa-google"></i>
                    </div>
                    <div className="social-btn" title="Continue with X"><i className="fab fa-twitter"></i></div>
                    <div className="social-btn" title="Continue with Facebook"><i className="fab fa-facebook-f"></i></div>
                    <div className="social-btn" title="Continue with Github"><i className="fab fa-github"></i></div>
                  </div>
                </div>

                <div className="register-link" style={{ marginTop: "15px", fontSize: "13px" }}>
                  <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setActiveForm("register"); }}>Register</a></p>
                </div>
              </form>
            </div>

            {/* Register Form */}
            <div id="register-form" className={`form-section ${activeForm === "register" ? "active" : ""}`}>
              <h2>Register</h2>
              <form id="registerForm" onSubmit={handleRegisterSubmit}>
                <div className="form-group">
                  <label htmlFor="reg-email">Email</label>
                  <div className="input-container">
                    <input type="email" id="reg-email" required />
                    <i className="fas fa-at icon"></i>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-password">Password</label>
                  <div className="input-container">
                    <input type={regPasswordType} id="reg-password" required />
                    <i 
                      className={`fas ${regPasswordType === "password" ? "fa-lock" : "fa-unlock"} eye-icon`} 
                      id="reg-eye-icon" 
                      onClick={() => setRegPasswordType(prev => prev === "password" ? "text" : "password")}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </div>
                </div>

                <div className="button-container">
                  <button className="button" type="submit">Register</button>
                </div>

                <div className="register-link" style={{ marginTop: "15px", fontSize: "13px" }}>
                  <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setActiveForm("login"); }}>Login</a></p>
                </div>
              </form>
            </div>

            {/* Forgot Password */}
            <div id="forgot-password-form" className={`form-section ${activeForm === "forgot" ? "active" : ""}`}>
              <h2>Reset Password</h2>
              <form id="forgotPasswordForm" onSubmit={handleForgotSubmit}>
                <div className="form-group">
                  <label htmlFor="reset-email">Enter your email</label>
                  <div className="input-container">
                    <input type="email" id="reset-email" required />
                    <i className="fas fa-at icon"></i>
                  </div>
                </div>

                <div className="button-container">
                  <button className="button" type="submit">Send Reset Link</button>
                </div>

                <div className="register-link">
                  <p>Remembered your password? <a href="#" onClick={(e) => { e.preventDefault(); setActiveForm("login"); }}>Login</a></p>
                </div>
              </form>
            </div>

          </div>
        </article>
      </div>
    </div>
  );
}
