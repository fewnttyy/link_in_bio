"use client";

import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "./login.css";
import Link from 'next/link';
import loginUser from '../api/auth/login';
import registerUser from '../api/auth/register';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { type } from "os";
// import { getCsrfCookie } from "../api/apiClient";

export default function Home() {
  const router = useRouter();

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [activeInput, setActiveInput] = useState({});
  const [activeBullet, setActiveBullet] = useState(1);
  const textSliderRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Baca role dari cookies setelah login
      const userRole = Cookies.get("role");
      setRole(userRole);

      // Redirect jika role sudah ada
      if (userRole === "user") {
        router.push("/user/main/dashboard");
      } else if (userRole === "super_admin") {
        router.push("/super_admin/main/dashboard");
      }
    }
  }, []);

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
    setErrorMessage(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const moveSlider = (index) => {
    setActiveBullet(index);

    // Update text slider translation
    const translateY = `-${(index - 1) * 2.2}rem`;
    if (textSliderRef.current) {
      textSliderRef.current.style.transform = `translateY(${translateY})`;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      // console.log("Password:", formData.password);
      // console.log("Password Confirmation:", formData.password_confirmation);


      // console.log(formData.username, formData.email, formData.phone, formData.password, formData.password_confirmation);
      const response = await registerUser(
        formData.username,
        formData.email,
        formData.phone,
        formData.password,
        formData.password_confirmation
      );
      alert("Registration successful! Please check your email.");
      setIsSignUpMode(false);
      console.log(response.user);
    } catch (error) {

      console.log("Full error:", error);

    } finally {
      setLoading(false);
    }
  };


  const handleLogin = async (e) => {
    // await getCsrfCookie();
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await loginUser(formData.email, formData.password);
      toast.success("Login berhasil! Selamat datang 👋");

      Cookies.set("role", response.user.role, { expires: 1 }); // Simpan role dengan masa berlaku 1 hari

      // Ambil role dari cookies
      const userRole = Cookies.get("role");
      console.log(userRole);
      // Redirect berdasarkan role
      if (userRole === "user") {
        router.push("/user/main/dashboard")
      } else if (userRole === "super_admin") {
        router.push("/super_admin/main/dashboard");
      } else {
        toast.error("Role tidak dikenali!");
      }

      console.log(response.user);
    } catch (error) {
      const errorMessage = error.message || "Terjadi kesalahan saat login.";
      toast.error(`${errorMessage}`);
      console.log("Full error:", error);
      console.log("Error response:", error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={isSignUpMode ? "sign-up-mode" : ""}>
      <ToastContainer />
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            {/* Form Login */}
            <form onSubmit={handleLogin} className="sign-in-form">
              <div className="logo">
                <h4>easyclass</h4>
              </div>

              <div className="heading">
                <h2>Welcome Back</h2>
                <h6 className="rtk">Not registered yet?</h6>
                <button type="button" className="toggle" onClick={toggleMode}>
                  Sign up
                </button>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="email"
                    name="email"
                    className="input-field"
                    autoComplete="off"
                    required
                    onChange={handleChange}
                  />
                  <label>Email</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    name="password"
                    className="input-field"
                    autoComplete="off"
                    required
                    onChange={handleChange}
                  />
                  <label>Password</label>
                </div>

                {errorMessage && <p className="error">{errorMessage}</p>}
                <button type="submit" className="sign-btn" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </button>

                <p className="text">
                  Forgotten your password?
                  <Link href="/login/forgetpassword">Get help</Link>
                  signing in
                </p>
              </div>
            </form>

            {/* Form Register */}
            <form onSubmit={handleRegister} className="sign-up-form">
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
                    name="username"
                    className="input-field"
                    autoComplete="off"
                    required
                    onChange={handleChange}
                  />
                  <label>Username</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="email"
                    name="email"
                    className="input-field"
                    autoComplete="off"
                    required
                    onChange={handleChange}
                  />
                  <label>Email</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="text"
                    name="phone"
                    className="input-field"
                    autoComplete="off"
                    required
                    onChange={handleChange}
                  />
                  <label>Phone</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    name="password"
                    className="input-field"
                    autoComplete="off"
                    required
                    onChange={handleChange}
                  />
                  <label>Password</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    name="password_confirmation"
                    className="input-field"
                    autoComplete="off"
                    required
                    onChange={handleChange}
                  />
                  <label>Confirm Password</label>
                </div>

                {errorMessage && <p className="error">{errorMessage}</p>}
                <button type="submit" className="sign-btn" disabled={loading}>
                  {loading ? "Signing up..." : "Sign Up"}
                </button>

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
