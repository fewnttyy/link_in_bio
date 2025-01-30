"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./newpassword.css"; // Pastikan CSS ini ada

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  // Handle ketika pengguna mengubah password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Handle ketika pengguna mengirimkan form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      alert("Your password has been reset successfully!");
      router.push("/login"); // Mengarahkan ke halaman login setelah reset password
    } else {
      alert("Passwords do not match. Please try again.");
    }
  };

  return (
    <main className="newpassword-page">
      <div className="newpassword">
        <h2>Create a New Password</h2>
        <p>Enter your new password below.</p>

        <form onSubmit={handleSubmit} className="newpassword-form">
          <div className="input-wrap">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="input-field"
              required
              placeholder="New Password"
            />
            <label>Password</label>
          </div>

          <div className="input-wrap">
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="input-field"
              required
              placeholder="Confirm Password"
            />
            <label>Confirm Password</label>
          </div>

          <button type="submit" className="submit-btn">Reset Password</button>
        </form>

        <p className="back-to-login">
          <a href="/login">Back to Login</a>
        </p>
      </div>
    </main>
  );
}
