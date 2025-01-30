"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./verification.css"; // Pastikan CSS ini ada

export default function Verification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]); // Array untuk menyimpan input code
  const router = useRouter();

  // Handle perubahan kode
  const handleCodeChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;

    if (e.target.value.length === 1 && index < 5) {
      // Fokus ke input berikutnya jika ada input
      document.getElementById(`code-input-${index + 1}`).focus();
    }

    setCode(newCode);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    const codeString = code.join("");

    if (codeString === "123456") { 
      alert("Code verified! Proceed to reset your password.");
      router.push("/login/newpassword"); // Mengarahkan ke halaman reset password setelah kode berhasil diverifikasi
    } else {
      alert("Invalid code. Please try again.");
    }
  };

  return (
    <main className="verification-page">
      <div className="verification">
        <h2>Enter the Reset Code</h2>
        <p>Please enter the code we sent to your email.</p>

        <form onSubmit={handleVerifyCode} className="verification-form">
          <div className="input-wrap">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleCodeChange(e, index)}
                className="input-field"
                required
                autoFocus={index === 0}
              />
            ))}
          </div>

          <button type="submit" className="submit-btn">Verify Code</button>
        </form>

        <p className="back-to-forget">
          <a href="/login/forgetpassword">Back to Forgot Password</a>
        </p>
      </div>
    </main>
  );
}
