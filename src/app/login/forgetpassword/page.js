"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./forget.css"; 

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Fungsi untuk handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`A reset code has been sent to ${email}`);

    // Arahkan pengguna ke halaman verifikasi
    router.push("/login/forgetpassword/verification"); 
  };

  return (
    <main className="forget-password-page">
      <div className="forget">
        <h2>Forgot your password?</h2>
        <p>Enter your email address below and we'll send you a code to reset your password.</p>

        <form onSubmit={handleSubmit} className="forget-form">
          <div className="input-wrap">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
              placeholder="Enter your email"
            />
            <label>Email</label>
          </div>

          <button type="submit" className="submit-btn">Send Reset Code</button>
        </form>

        <p className="back-to-login">
          <a href="/login">Back to Login</a>
        </p>
      </div>
    </main>
  );
}
