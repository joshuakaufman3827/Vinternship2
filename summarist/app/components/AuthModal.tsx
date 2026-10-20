"use client";

import { useState } from "react";
import { useAuthModal } from "../context/AuthModalContext";

export default function AuthModal() {
  const { isOpen, mode, closeModal } = useAuthModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Firebase logic will be added in Step 3.8
    setTimeout(() => {
      setLoading(false);
      alert(`${mode === "login" ? "Logged in" : "Account created"} (placeholder)`);
      closeModal();
    }, 1000);
  };

  return (
    <div className="auth-modal__overlay">
      <div className="auth-modal">
        <button className="auth-modal__close" onClick={closeModal}>
          ✕
        </button>

        <h2>{mode === "login" ? "Login" : "Create Account"}</h2>

        <form onSubmit={handleSubmit} className="auth-modal__form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="auth-modal__error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <button className="auth-modal__guest">Continue as Guest</button>

        {mode === "login" ? (
          <p className="auth-modal__switch">
            Don’t have an account?{" "}
            <span onClick={() => closeModal()}>Create one</span>
          </p>
        ) : (
          <p className="auth-modal__switch">
            Already have an account?{" "}
            <span onClick={() => closeModal()}>Login</span>
          </p>
        )}
      </div>
    </div>
  );
}

