"use client"

import { useState } from "react"
import { Button, Input, Icon } from "./ui"

export default function LoginForm({ onBack, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const isFormValid = email.trim() !== "" && password.trim() !== ""

  const handleLogin = () => {
    if (isFormValid) {
      onLoginSuccess()
    }
  }

  return (
    <div className="login-screen">
      <div className="login-header">
        <button onClick={onBack} className="back-button">
          <Icon name="arrowLeft" size={24} color="#2F2F2F" />
        </button>
        <h2 className="login-title">Se connecter</h2>
        <button onClick={onClose} className="close-button">
          <Icon name="close" size={24} color="#2F2F2F" />
        </button>
      </div>

      <div className="login-content" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <h1 className="login-subtitle">Contents de te revoir !</h1>

        <Input
          type="email"
          placeholder="Email"
          label="Pseudo ou email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div style={{ marginTop: "20px" }}>
          <Input
            type="password"
            placeholder="Mot de passe"
            label="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPasswordToggle={true}
          />
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <Button variant="primary" fullWidth onClick={handleLogin} disabled={!isFormValid}>
            Se connecter
          </Button>

          <a href="#" className="forgot-password">
            J'ai oublié mon mot de passe
          </a>
        </div>
      </div>
    </div>
  )
}
