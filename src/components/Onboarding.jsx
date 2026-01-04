"use client"

import { useState } from "react"
import { Typography, Button, ProgressBar, Icon } from "./ui"

export default function Onboarding({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const progress = currentStep

  if (currentStep === 0) {
    return (
      <div className="onboarding-container">
        <div
          className="onboarding-step welcome-step"
          style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}
        >
          <Typography variant="h1" align="center" className="welcome-title">
            Bienvenue sur <span className="app-name">l'app</span>
          </Typography>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <div style={{ width: "100%", maxWidth: "362px" }}>
              <Button variant="primary" onClick={nextStep} fullWidth>
                Commencer
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="onboarding-container">
      <div className="onboarding-step">
        <ProgressBar current={progress} total={5} />

        {currentStep === 1 && (
          <Typography variant="h2" className="step-title">
            Découvrons des lieux adaptés à ma sensibilité
          </Typography>
        )}
        {currentStep === 2 && (
          <Typography variant="h2" className="step-title">
            Évitons les zones pouvant nous gêner au quotidien
          </Typography>
        )}
        {currentStep === 3 && (
          <Typography variant="h2" className="step-title">
            Des lieux vérifiés
          </Typography>
        )}
        {currentStep === 4 && (
          <Typography variant="h2" className="step-title">
            Participez à des sorties accompagnées
          </Typography>
        )}
        {currentStep === 5 && (
          <Typography variant="h2" className="step-title">
            Filtrez la carte par sens
          </Typography>
        )}

        <button onClick={nextStep} className="next-button">
          <Icon name="arrowRight" size={24} color="white" />
        </button>
      </div>
    </div>
  )
}
