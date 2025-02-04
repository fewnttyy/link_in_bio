"use client";

import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "../user/styles/globals.css";
import styles from '../user/styles/login.module.css';
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

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     // Baca role dari cookies setelah login
  //     const userRole = Cookies.get("role");
  //     setRole(userRole);

  //     // Redirect jika role sudah ada
  //     if (userRole === "user") {
  //       router.push("/user/main/dashboard");
  //     } else if (userRole === "super_admin") {
  //       router.push("/super_admin/main/dashboard");
  //     }
  //   }
  // }, []);

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

      toast.success("Registrasi berhasil! Silakan cek email untuk verifikasi.");
      setIsSignUpMode(false);
      console.log("User Terdaftar:", response.user);
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

      // ✅ Simpan token dan role dengan aman di cookies
      Cookies.set("token", response.token, { expires: 1, secure: true, sameSite: "Strict" });
      Cookies.set("role", response.user.role, { expires: 1, secure: true, sameSite: "Strict" });
      Cookies.set("id_user", response.user.id, { expires: 1, secure: true, sameSite: "Strict" });

      // ✅ Pastikan token tersimpan
      const token = Cookies.get("token");
      const userRole = Cookies.get("role");
      const idUser = Cookies.get("id_user");

      console.log("Token:", token); // Debugging
      console.log("Role:", userRole); // Debugging
      console.log("Id User:", idUser); // Debugging

      // Redirect berdasarkan role
      if (userRole === "user") {
        router.push("/user/page/dashboard")
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
    <main
      className={`${styles.main} ${styles["main-container"]} ${isSignUpMode ? styles["sign-up-mode"] : ""
        }`}
    >
      <ToastContainer />
      <div className={styles.box}>
        <div className={styles["inner-box"]}>
          <div className={styles["forms-wrap"]}>
            {/* Login Form */}
            <form
              onSubmit={handleLogin}
              className={`${styles["form-login"]} ${styles["sign-in-form"]}`}
            >
              <div className={styles.logo}>
                <h4>easyclass</h4>
              </div>
              <div className={styles.heading}>
                <h2>Welcome Back</h2>
                <h6>Not registered yet? </h6>
                <button
                  type="button"
                  className={`${styles["button-login"]} ${styles.toggle}`}
                  onClick={toggleMode}
                >
                  Sign up
                </button>
              </div>
              <div className={styles["actual-form"]}>
                <div className={styles["input-wrap"]}>
                  <input
                    type="email"
                    name="email"
                    className={styles["input-field"]}
                    autoComplete="off"
                    placeholder=" "
                    required
                    onChange={handleChange}
                  />
                  <label className={styles["label-login"]}>Email</label>
                </div>
                <div className={styles["input-wrap"]}>
                  <input
                    type="password"
                    name="password"
                    className={styles["input-field"]}
                    autoComplete="off"
                    placeholder=" "
                    required
                    onChange={handleChange}
                  />
                  <label className={styles["label-login"]}>Password</label>
                </div>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                <button type="submit" className={styles["sign-btn"]} disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>

            {/* Register Form */}
            <form
              onSubmit={handleRegister}
              className={`${styles["form-login"]} ${styles["sign-up-form"]}`}
            >
              <div className={styles.logo}>
                <h4>easyclass</h4>
              </div>
              <div className={styles.heading}>
                <h2>Get Started</h2>
                <h6>Already have an account? </h6>
                <button
                  type="button"
                  className={`${styles["button-login"]} ${styles.toggle}`}
                  onClick={toggleMode}
                >
                  Sign in
                </button>
              </div>
              <div className={styles["actual-form"]}>
                <div className={styles["input-wrap"]}>
                  <input
                    type="text"
                    name="username"
                    className={styles["input-field"]}
                    autoComplete="off"
                    placeholder=" "
                    required
                    onChange={handleChange}
                  />
                  <label className={styles["label-login"]}>Username</label>
                </div>
                <div className={styles["input-wrap"]}>
                  <input
                    type="email"
                    name="email"
                    className={styles["input-field"]}
                    autoComplete="off"
                    placeholder=" "
                    required
                    onChange={handleChange}
                  />
                  <label className={styles["label-login"]}>Email</label>
                </div>
                <div className={styles["input-wrap"]}>
                  <input
                    type="text"
                    name="phone"
                    className={styles["input-field"]}
                    autoComplete="off"
                    placeholder=" "
                    required
                    onChange={handleChange}
                  />
                  <label className={styles["label-login"]}>Phone</label>
                </div>
                <div className={styles["input-wrap"]}>
                  <input
                    type="password"
                    name="password"
                    className={styles["input-field"]}
                    autoComplete="off"
                    placeholder=" "
                    required
                    onChange={handleChange}
                  />
                  <label className={styles["label-login"]}>Password</label>
                </div>
                <div className={styles["input-wrap"]}>
                  <input
                    type="password"
                    name="password_confirmation"
                    className={styles["input-field"]}
                    autoComplete="off"
                    placeholder=" "
                    required
                    onChange={handleChange}
                  />
                  <label className={styles["label-login"]}>Confirm Password</label>
                </div>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                <button type="submit" className={styles["sign-btn"]} disabled={loading}>
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </div>
            </form>
          </div>

          {/* Carousel */}
          <div className={styles.carousel}>
            <div className={styles["images-wrapper"]}>
              <img
                src="/images/podcast.png"
                className={`${styles.image} ${styles["img-1"]} ${activeBullet === 1 ? styles.show : ""
                  }`}
                alt="Podcast Image"
              />
              <img
                src="/images/shopping.png"
                className={`${styles.image} ${styles["img-2"]} ${activeBullet === 2 ? styles.show : ""
                  }`}
                alt="Shopping Image"
              />
              <img
                src="/images/social.png"
                className={`${styles.image} ${styles["img-3"]} ${activeBullet === 3 ? styles.show : ""
                  }`}
                alt="Social Image"
              />
            </div>
            <div className={styles["text-slider"]}>
              <div className={styles["text-wrap"]}>
                <div className={styles["text-group"]} ref={textSliderRef}>
                  <h2>Flexible Links for Your Digital Life!</h2>
                  <h2>Sell & Share with Just One Link!</h2>
                  <h2>Boost Your Social & Sales in One Click!</h2>
                </div>
              </div>
              <div className={styles.bullets}>
                {[1, 2, 3].map((index) => (
                  <span
                    key={index}
                    className={activeBullet === index ? styles.active : ""}
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
