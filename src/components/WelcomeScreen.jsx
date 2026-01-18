"use client"

import { Button } from "./ui"
import "../App.css"

export default function WelcomeScreen({ onLogin, onSignup, onSkip }) {
  return (
    <div className="welcome-screen">
      {/* Zone haute verte */}
      <div className="welcome-top">
        <div className="welcome-content">
          <img 
            src="/images/mascot-dark.png" 
            alt="Nuance mascot" 
            className="welcome-mascot"
          />
          <h1 className="welcome-title">nuance</h1>
          <p className="welcome-tagline">Ressentir le monde autrement</p>
        </div>
      </div>

      {/* Zone basse blanche avec boutons */}
      <div className="welcome-bottom">
        <div className="welcome-buttons">
          <Button variant="primary" fullWidth onClick={onSignup}>
            Créer mon compte
          </Button>

          <Button variant="secondary" fullWidth onClick={onLogin}>
            Se connecter
          </Button>

          <button className="welcome-skip-link" onClick={onSkip}>
            Continuer sans me connecter
          </button>
        </div>
      </div>
    </div>
  )
}
