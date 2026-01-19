"use client"

import { useState } from "react"
import { Button, ProgressBar, Input, Select, Icon } from "./ui"
import SenseTrigger from "./ui/SenseTrigger"

export default function SignupForm({ onBack, onClose, onSignupSuccess }) {
  const [step, setStep] = useState(0)
  const [avoids, setAvoids] = useState([])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [theme, setTheme] = useState("")
  const [pseudo, setPseudo] = useState("")

  const isStepValid = () => {
    switch (step) {
      case 0:
        return pseudo.trim() !== ""
      case 1:
        return firstName.trim() !== "" && lastName.trim() !== "" && email.trim() !== ""
      case 2:
        return age !== ""
      case 3:
        return avoids.length > 0
      case 4:
        return theme !== ""
      default:
        return false
    }
  }

  const progress = ((step + 1) / 5) * 100

  const nextStep = () => {
    if (step < 4 && isStepValid()) {
      setStep(step + 1)
    } else if (step === 4 && isStepValid()) {
      onSignupSuccess()
    }
  }

  const toggleAvoid = (item) => {
    if (avoids.includes(item)) {
      setAvoids(avoids.filter((i) => i !== item))
    } else {
      setAvoids([...avoids, item])
    }
  }

  return (
    <div className="signup-screen">
      <div className="signup-header">
        <button onClick={step === 0 ? onBack : () => setStep(step - 1)} className="back-button">
          <Icon name="arrowLeft" size={24} color="#2F2F2F" />
        </button>
        <h2 className="signup-title">Création de compte</h2>
        <button onClick={onClose} className="close-button">
          <Icon name="close" size={24} color="#2F2F2F" />
        </button>
      </div>

      <div style={{ padding: "16px 32px" }}>
        <ProgressBar progress={progress} />
      </div>

      <div className="signup-content" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {step === 0 && (
          <>
            <h1 className="signup-subtitle">Bienvenue ! Choisis ton pseudo</h1>
            <Input
              type="text"
              placeholder="@"
              label="Pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
            />
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="signup-subtitle">Quelques infos à propos de toi</h1>
            <Input
              type="text"
              placeholder="Prénom"
              label="Prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <div style={{ marginTop: "20px" }}>
              <Input
                type="text"
                placeholder="Nom"
                label="Nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <Input
                type="email"
                placeholder="Email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="signup-subtitle">Quel âge as-tu ?</h1>
            <Select
              value={age}
              onChange={setAge}
              options={[
                { value: "Moins de 18 ans", label: "Moins de 18 ans" },
                { value: "18-25 ans", label: "18-25 ans" },
                { value: "26-35 ans", label: "26-35 ans" },
                { value: "36-50 ans", label: "36-50 ans" },
                { value: "Plus de 50 ans", label: "Plus de 50 ans" },
              ]}
              fullWidth
            />
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="signup-subtitle">Qu'est ce que je veux éviter ?</h1>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <SenseTrigger
                type="light"
                label="Lumière"
                selected={avoids.includes("light")}
                onClick={() => toggleAvoid("light")}
              />
              <SenseTrigger
                type="sound"
                label="Bruit"
                selected={avoids.includes("sound")}
                onClick={() => toggleAvoid("sound")}
              />
              <SenseTrigger
                type="crowd"
                label="Foule"
                selected={avoids.includes("crowd")}
                onClick={() => toggleAvoid("crowd")}
              />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h1 className="signup-subtitle">Quel thème te convient pour ton application ?</h1>
            <div className="theme-options">
              {["Clair", "Sombre", "Auto"].map((option) => (
                <button
                  key={option}
                  className={`theme-button ${theme === option ? "selected" : ""}`}
                  onClick={() => setTheme(option)}
                >
                  <div className="theme-radio">{theme === option && <div className="theme-radio-selected" />}</div>
                  <span>{option}</span>
                </button>
              ))}
            </div>
          </>
        )}

        <div style={{ marginTop: "auto", display: "flex", justifyContent: "center", paddingTop: "32px" }}>
          <Button variant="primary" fullWidth onClick={nextStep} disabled={!isStepValid()}>
            {step === 4 ? "Créer mon compte" : "Suivant"}
          </Button>
        </div>
      </div>
    </div>
  )
}
