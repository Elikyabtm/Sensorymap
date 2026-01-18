"use client"

import { useState } from "react"
import { ProgressBar } from "./ui/ProgressBar"
import { Icon } from "./ui/Icon"
import "../styles/Onboarding.css"

export default function Onboarding({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedSenses, setSelectedSenses] = useState([])
  const totalSteps = 6

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const toggleSense = (sense) => {
    setSelectedSenses(prev => 
      prev.includes(sense) 
        ? prev.filter(s => s !== sense)
        : [...prev, sense]
    )
  }

  const progress = currentStep > 0 ? ((currentStep) / (totalSteps - 1)) * 100 : 0

  // Ecran 1: Bienvenue sur nuance
  if (currentStep === 0) {
    return (
      <div className="onboarding-container">
        <div className="onboarding-screen">
          <div className="onboarding-visual visual-welcome">
            <img 
              src="/images/mascot-static.png" 
              alt="Mascotte nuance" 
              className="welcome-mascot-image"
            />
          </div>
          <div className="onboarding-content content-dark">
            <div className="welcome-text-container">
              <h1 className="welcome-title">
                <span className="white-text">Bienvenue sur </span>
                <span className="green-text">nuance</span>
              </h1>
              <p className="welcome-description">
                {"J'ai deux trois choses à t'expliquer pour commencer, tu veux bien me suivre ?"}
              </p>
            </div>
            <button className="commencons-button" onClick={nextStep}>
              Commencons
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="onboarding-container">
      <div className="onboarding-screen">
        {/* Zone haute avec visuel */}
        <div className={`onboarding-visual ${currentStep === 1 ? 'visual-sensory' : 'visual-map'}`}>
          <div className="onboarding-progress">
            <ProgressBar progress={progress} />
          </div>

          {/* Etape 2: Selection des sens */}
          {currentStep === 1 && (
            <div className="sensory-selection">
              <button 
                className={`sensory-item ${selectedSenses.includes('light') ? 'selected' : ''}`}
                onClick={() => toggleSense('light')}
              >
                <div className="sensory-icon-circle purple">
                  <Icon name="light" size={36} color="white" />
                </div>
                <span className="sensory-label">Lumiere</span>
              </button>
              <button 
                className={`sensory-item ${selectedSenses.includes('sound') ? 'selected' : ''}`}
                onClick={() => toggleSense('sound')}
              >
                <div className="sensory-icon-circle orange">
                  <Icon name="sound" size={36} color="white" />
                </div>
                <span className="sensory-label">Bruit</span>
              </button>
              <button 
                className={`sensory-item ${selectedSenses.includes('crowd') ? 'selected' : ''}`}
                onClick={() => toggleSense('crowd')}
              >
                <div className="sensory-icon-circle teal">
                  <Icon name="crowd" size={36} color="white" />
                </div>
                <span className="sensory-label">Foule</span>
              </button>
            </div>
          )}

          {/* Etape 3: Carte avec jauges - Trouver des lieux */}
          {currentStep === 2 && (
            <div className="map-visual">
              <img 
                src="/images/onboarding-map.png" 
                alt="Carte" 
                className="map-background"
              />
              <div className="map-pins">
                <div className="map-pin-small" style={{ top: '25%', left: '25%' }}>
                  <img src="/woman-pink-hair-avatar.jpg" alt="Pin" />
                </div>
                <div className="map-pin-large" style={{ top: '15%', left: '45%' }}>
                  <img src="/woman-blonde-avatar.jpg" alt="Pin" />
                </div>
                <div className="map-pin-small" style={{ top: '30%', left: '70%' }}>
                  <img src="/woman-blue-hair-avatar.jpg" alt="Pin" />
                </div>
              </div>
              <div className="sensory-card">
                <div className="sensory-card-item">
                  <Icon name="light" size={24} color="#2A3556" />
                  <div className="sensory-card-info">
                    <span className="sensory-card-label">Assez lumineux</span>
                    <div className="sensory-bar">
                      <div className="sensory-bar-bg purple-bg" />
                      <div className="sensory-bar-fill purple" style={{ width: '55%' }} />
                    </div>
                  </div>
                </div>
                <div className="sensory-card-item">
                  <Icon name="sound" size={24} color="#2A3556" />
                  <div className="sensory-card-info">
                    <span className="sensory-card-label">Peu bruyant</span>
                    <div className="sensory-bar">
                      <div className="sensory-bar-bg orange-bg" />
                      <div className="sensory-bar-fill orange" style={{ width: '25%' }} />
                    </div>
                  </div>
                </div>
                <div className="sensory-card-item">
                  <Icon name="crowd" size={24} color="#2A3556" />
                  <div className="sensory-card-info">
                    <span className="sensory-card-label">Tres frequente</span>
                    <div className="sensory-bar">
                      <div className="sensory-bar-bg teal-bg" />
                      <div className="sensory-bar-fill teal" style={{ width: '85%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Etape 4: Zones sensibles - Anticipons */}
          {currentStep === 3 && (
            <div className="map-visual">
              <img 
                src="/images/onboarding-map.png" 
                alt="Carte" 
                className="map-background"
              />
              <div className="sensitive-zone" />
              <div className="alert-card">
                <div className="alert-icon">
                  <Icon name="sound" size={24} color="white" />
                </div>
                <span className="alert-text">Bruit signale il y a 20min</span>
              </div>
            </div>
          )}

          {/* Etape 5: Lieu serein - Decouvrons */}
          {currentStep === 4 && (
            <div className="map-visual">
              <img 
                src="/images/onboarding-map.png" 
                alt="Carte" 
                className="map-background"
              />
              <div className="certified-pin">
                <div className="certified-pin-image">
                  <img src="/woman-blonde-avatar.jpg" alt="Lieu certifie" />
                </div>
                <div className="certified-pin-badge">
                  <Icon name="certified" size={20} color="#204040" />
                </div>
              </div>
            </div>
          )}

          {/* Etape 6: Explorons les lieux a plusieurs */}
          {currentStep === 5 && (
            <div className="group-visual">
              <img 
                src="/images/onboarding-group.jpg" 
                alt="Groupe de personnes" 
                className="group-photo"
              />
            </div>
          )}
        </div>

        {/* Zone basse avec texte et footer */}
        <div className="onboarding-content content-dark">
          {currentStep === 1 && (
            <div className="onboarding-text">
              <h2 className="onboarding-title">Choisissons les elements qui te touchent le plus</h2>
              <p className="onboarding-description">
                Nous ne reagissons pas tous aux memes choses.<br/>
                Dis-moi ce qui te perturbe, je m'adapterai.
              </p>
            </div>
          )}

          {currentStep === 2 && (
            <div className="onboarding-text">
              <h2 className="onboarding-title">Trouvons des lieux adaptes a ta sensibilite</h2>
              <p className="onboarding-description">
                Chaque lieu est evalue selon les sens. Plus la jauge monte, plus le sens est sollicite.
              </p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="onboarding-text">
              <h2 className="onboarding-title">Anticipons ensemble les zones sensibles</h2>
              <p className="onboarding-description">
                Signale une zone et decouvre celles signalees par la communaute.
              </p>
            </div>
          )}

          {currentStep === 4 && (
            <div className="onboarding-text">
              <div className="lieu-serein-badge">
                <Icon name="certified" size={16} color="#204040" />
                <span>Lieu serein</span>
              </div>
              <h2 className="onboarding-title">Decouvrons "les lieux sereins"</h2>
              <p className="onboarding-description">
                {"Lorsque tu vois ce label sur un lieu, tu peux y aller en confiance, je l'ai verifie pour toi."}
              </p>
            </div>
          )}

          {currentStep === 5 && (
            <div className="onboarding-text">
              <h2 className="onboarding-title">Explorons les lieux a plusieurs</h2>
              <p className="onboarding-description">
                {"Parfois, ensemble on se sent plus a l'aise. Participe a des sorties accompagnees et decouvre de nouveaux lieux."}
              </p>
            </div>
          )}

          {/* Footer avec mascotte et bouton */}
          <div className="onboarding-footer">
            <div className="mascot-container">
              <img 
                src="/images/walking-logo.gif" 
                alt="Mascotte" 
                className="mascot-gif"
              />
            </div>
            <button className="suivant-button" onClick={nextStep}>
              <span>Suivant</span>
              <Icon name="arrowRight" size={18} color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
