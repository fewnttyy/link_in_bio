"use client";

import React, { useState, useRef } from "react";
import "./login.css";
import Link from 'next/link';

export default function Home() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [activeInput, setActiveInput] = useState({});
  const [activeBullet, setActiveBullet] = useState(1);
  const textSliderRef = useRef(null);

  const handleInputFocus = (field) => {
    setActiveInput((prev) => ({ ...prev, [field]: true }));
  };

  const handleInputBlur = (field, value) => {
    if (value === "") {
      setActiveInput((prev) => ({ ...prev, [field]: false }));
    }
  };

  const toggleMode = () => {
    setIsSignUpMode((prev) => !prev);
  };

  const moveSlider = (index) => {
    setActiveBullet(index);

    // Update text slider translation
    const translateY = `-${(index - 1) * 2.2}rem`;
    if (textSliderRef.current) {
      textSliderRef.current.style.transform = `translateY(${translateY})`;
    }
  };

  return (
    <main className={isSignUpMode ? "sign-up-mode" : ""}>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            <form action="index.html" autoComplete="off" className="sign-in-form">
              <div className="logo">
                <h4>easyclass</h4>
              </div>

              <div className="heading">
                <h2>Welcome Back</h2>
                <h6>Not registered yet?</h6>
                <button type="button" className="toggle" onClick={toggleMode}>
                  Sign up
                </button>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    minLength="4"
                    className={`input-field ${activeInput.name ? "active" : ""}`}
                    autoComplete="off"
                    required
                    onFocus={() => handleInputFocus("name")}
                    onBlur={(e) => handleInputBlur("name", e.target.value)}
                  />
                  <label>Name</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    minLength="4"
                    className={`input-field ${activeInput.password ? "active" : ""}`}
                    autoComplete="off"
                    required
                    onFocus={() => handleInputFocus("password")}
                    onBlur={(e) => handleInputBlur("password", e.target.value)}
                  />
                  <label>Password</label>
                </div>

                <input type="submit" value="Sign In" className="sign-btn" />

                <p className="text">
                  Forgotten your password or your login details?
                  <Link href="/login/forgetpassword">Get help</Link>
                  signing in
                </p>
              </div>
            </form>

            <form action="index.html" autoComplete="off" className="sign-up-form">
              <div className="logo">
                <h4>easyclass</h4>
              </div>

              <div className="heading">
                <h2>Get Started</h2>
                <h6>Already have an account?</h6>
                <button type="button" className="toggle" onClick={toggleMode}>
                  Sign in
                </button>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    minLength="4"
                    className={`input-field ${activeInput.signupName ? "active" : ""}`}
                    autoComplete="off"
                    required
                    onFocus={() => handleInputFocus("signupName")}
                    onBlur={(e) => handleInputBlur("signupName", e.target.value)}
                  />
                  <label>Name</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="email"
                    className={`input-field ${activeInput.email ? "active" : ""}`}
                    autoComplete="off"
                    required
                    onFocus={() => handleInputFocus("email")}
                    onBlur={(e) => handleInputBlur("email", e.target.value)}
                  />
                  <label>Email</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    minLength="4"
                    className={`input-field ${activeInput.signupPassword ? "active" : ""}`}
                    autoComplete="off"
                    required
                    onFocus={() => handleInputFocus("signupPassword")}
                    onBlur={(e) => handleInputBlur("signupPassword", e.target.value)}
                  />
                  <label>Password</label>
                </div>

                <input type="submit" value="Sign Up" className="sign-btn" />

                <p className="text">
                  By signing up, I agree to the
                  <a href="#">Terms of Services</a> and
                  <a href="#">Privacy Policy</a>
                </p>
              </div>
            </form>
          </div>

          <div className="carousel">
            <div className="images-wrapper">
              <img src="/images/podcast.png" className={`image img-1 ${activeBullet === 1 ? "show" : ""}`} alt="Podcast Image" />
              <img src="/images/shopping.png" className={`image img-2 ${activeBullet === 2 ? "show" : ""}`} alt="Podcast Image" />
              <img src="/images/social.png" className={`image img-3 ${activeBullet === 3 ? "show" : ""}`} alt="Podcast Image" />
            </div>

            <div className="text-slider">
              <div className="text-wrap">
                <div className="text-group" ref={textSliderRef}>
                  <h2>Flexible Links for Your Digital Life!</h2>
                  <h2>Sell & Share with Just One Link!</h2>
                  <h2>Boost Your Social & Sales in One Click!</h2>
                </div>
              </div>

              <div className="bullets">
                {[1, 2, 3].map((index) => (
                  <span
                    key={index}
                    className={activeBullet === index ? "active" : ""}
                    onClick={() => moveSlider(index)}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
