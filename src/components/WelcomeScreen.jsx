"use client"

import { Button } from "./ui"

export default function WelcomeScreen({ onLogin, onSignup, onSkip }) {
  return (
    <div className="welcome-container">
      <div style={{ textAlign: "center", padding: "60px 32px" }}>
        <div
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "#D9D9D9",
            margin: "0 auto 40px",
          }}
        />
        <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "8px", color: "#2F2F2F" }}>[nom app]</h1>
        <p style={{ fontSize: "16px", color: "#666" }}>Description</p>
      </div>

      <div style={{ padding: "0 32px 40px", marginTop: "auto" }}>
        <Button variant="primary" fullWidth onClick={onSignup} style={{ marginBottom: "16px" }}>
          Créer mon compte
        </Button>

        <Button variant="secondary" fullWidth onClick={onLogin} style={{ marginBottom: "24px" }}>
          Se connecter
        </Button>

        <Button variant="text" fullWidth onClick={onSkip}>
          Continuer sans me connecter
        </Button>
      </div>
    </div>
  )
}