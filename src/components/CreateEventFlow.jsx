"use client"

import { useState } from "react"
import { Icon, Button, ProgressBar } from "./ui"
import "../styles/CreateEventFlow.css"

const MONTHS = ["JANVIER", "FÉVRIER", "MARS", "AVRIL", "MAI", "JUIN", "JUILLET", "AOÛT", "SEPTEMBRE", "OCTOBRE", "NOVEMBRE", "DÉCEMBRE"]
const DAYS = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"]

const TIME_SLOTS = [
  "08:00", "09:00", "10:00",
  "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00",
]

// Créneaux avec des notifications (autres personnes intéressées)
const NOTIFIED_SLOTS = ["10:00", "14:00", "17:00", "18:00"]

export default function CreateEventFlow({ onClose, onComplete, event }) {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [message, setMessage] = useState("")
  const [currentMonth, setCurrentMonth] = useState(0) // 0 = Janvier 2026
  const [currentYear, setCurrentYear] = useState(2026)

  const getProgressPercentage = () => {
    switch (step) {
      case 1: return 25
      case 2: return 50
      case 3: return 75
      case 4: return 100
      default: return 0
    }
  }

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month, year) => {
    const day = new Date(year, month, 1).getDay()
    return day === 0 ? 6 : day - 1 // Convertir dimanche=0 en dimanche=6
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleDateSelect = (day) => {
    setSelectedDate({ day, month: currentMonth, year: currentYear })
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      onClose()
    }
  }

  const handleSkipMessage = () => {
    setStep(4)
  }

  const handleViewEvent = () => {
    if (onComplete) onComplete()
  }

  const handleReturnToPlace = () => {
    onClose()
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

    // Jours vides au début
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="create-event-calendar-day empty" />)
    }

    // Jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate?.day === day && 
                        selectedDate?.month === currentMonth && 
                        selectedDate?.year === currentYear
      days.push(
        <button
          key={day}
          className={`create-event-calendar-day ${isSelected ? "selected" : ""}`}
          onClick={() => handleDateSelect(day)}
        >
          {day}
        </button>
      )
    }

    return days
  }

  const renderStep1 = () => (
    <div className="create-event-step">
      <h2 className="create-event-question">Choisis la date qui te conviens</h2>
      
      <div className="create-event-calendar">
        <div className="create-event-calendar-header">
          <span className="create-event-month">{MONTHS[currentMonth]} {currentYear}</span>
          <div className="create-event-nav-buttons">
            <button className="create-event-nav-btn" onClick={handlePrevMonth}>
              <Icon name="arrowLeft" size={20} color="#2A3556" />
            </button>
            <button className="create-event-nav-btn" onClick={handleNextMonth}>
              <Icon name="arrowRight" size={20} color="#2A3556" />
            </button>
          </div>
        </div>
        
        <div className="create-event-calendar-divider" />
        
        <div className="create-event-weekdays">
          {DAYS.map((day) => (
            <span key={day} className="create-event-weekday">{day}</span>
          ))}
        </div>
        
        <div className="create-event-days-grid">
          {renderCalendar()}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="create-event-step">
      <h2 className="create-event-question">Choisis l'heure</h2>
      
      <div className="create-event-time-grid">
        {TIME_SLOTS.map((time) => {
          const hasNotif = NOTIFIED_SLOTS.includes(time)
          const isSelected = selectedTime === time
          return (
            <button
              key={time}
              className={`create-event-time-slot ${isSelected ? "selected" : ""}`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
              {hasNotif && <span className="create-event-time-notif" />}
            </button>
          )
        })}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="create-event-step">
      <h2 className="create-event-question">Veux-tu laisser un message aux futurs participants ?</h2>
      
      <div className="create-event-message-form">
        <label className="create-event-label">Title</label>
        <textarea
          className="create-event-textarea"
          placeholder="Ex : Je porte parfois un casque anti-bruit."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="create-event-skip-link" onClick={handleSkipMessage}>
          Passer cette étape
        </button>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="create-event-step create-event-success">
      <div className="create-event-success-content">
        <h2 className="create-event-success-title">Ta sortie est créée !</h2>
        <p className="create-event-success-text">
          Tu seras notifié dès qu'un participant s'inscrira.
        </p>
      </div>
    </div>
  )

  const canProceed = () => {
    switch (step) {
      case 1: return selectedDate !== null
      case 2: return selectedTime !== null
      case 3: return true
      default: return false
    }
  }

  return (
    <div className="create-event-flow">
      <div className="create-event-header">
        <button className="create-event-back" onClick={handleBack}>
          <Icon name="arrowLeft" size={30} color="#2A3556" />
        </button>
        <h1 className="create-event-title">Profil</h1>
        <button className="create-event-close" onClick={onClose}>
          <div className="create-event-close-btn">
            <Icon name="close" size={18} color="#2D3A40" />
          </div>
        </button>
      </div>

      <div className="create-event-content">
        {step !== 4 && (
          <div className="create-event-progress">
            <ProgressBar percentage={getProgressPercentage()} />
          </div>
        )}

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>

      <div className="create-event-footer">
        {step === 4 ? (
          <div className="create-event-footer-buttons">
            <Button
              variant="secondary"
              size="large"
              onClick={handleViewEvent}
              style={{ width: "100%" }}
            >
              Voir la sortie
            </Button>
            <Button
              variant="primary"
              size="large"
              onClick={handleReturnToPlace}
              style={{ width: "100%" }}
            >
              Retourner à la fiche de lieu
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            size="large"
            onClick={handleNext}
            disabled={!canProceed()}
            style={{ width: "100%", opacity: canProceed() ? 1 : 0.3 }}
          >
            Suivant
          </Button>
        )}
      </div>
    </div>
  )
}
