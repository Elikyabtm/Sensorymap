"use client"

import { useState } from "react"
import { Button } from "./ui"
import "../styles/ThemeCustomizationModal.css"

const ThemeCustomizationModal = ({ isOpen, onClose, onSave }) => {
  const [modalState, setModalState] = useState("minimized") // minimized, font, color, layout
  const [hasChanges, setHasChanges] = useState(false)

  // Theme settings
  const [fontSize, setFontSize] = useState(2) // 0-4 scale
  const [fontFamily, setFontFamily] = useState("Inter")
  const [fontWeight, setFontWeight] = useState("Medium")
  const [accentColor, setAccentColor] = useState("#39BE5F")
  const [spacing, setSpacing] = useState("Comfortable")

  const [previewIndex, setPreviewIndex] = useState(1)

  const handleSave = () => {
    if (hasChanges) {
      onSave({
        fontSize,
        fontFamily,
        fontWeight,
        accentColor,
        spacing,
      })
      setHasChanges(false)
    }
  }

  const handleChange = () => {
    setHasChanges(true)
  }

  const handleBack = () => {
    if (modalState !== "minimized") {
      setModalState("minimized")
    } else {
      onClose()
    }
  }

  const fontSizeLabels = ["Très petit", "Petit", "Moyen", "Grand", "Très grand"]
  const accentColors = [
    { id: "custom", color: "#8FC8FF", isCustom: true },
    { id: "green", color: "#39BE5F" },
    { id: "yellow", color: "#DBC743" },
    { id: "pink", color: "#F172D9" },
    { id: "cyan", color: "#6FD5E0" },
    { id: "purple", color: "#AB5CC3" },
  ]

  if (!isOpen) return null

  const getModalHeight = () => {
    if (modalState === "minimized") return "256px"
    if (modalState === "font") return "510px"
    if (modalState === "color") return "265px"
    if (modalState === "layout") return "342px"
    return "256px"
  }

  return (
    <div className="theme-customization-overlay">
      <div className="theme-customization-container">
        {/* Header */}
        <div className="theme-custom-header">
          <button className="theme-custom-back-btn" onClick={handleBack}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M18 22L10 15L18 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="theme-custom-title">Personnalisation</div>
          <div style={{ width: "35px", height: "36px" }} />
        </div>

        {/* Preview Carousel */}
        <div className="theme-preview-carousel">
          <div className="theme-preview-track" style={{ transform: `translateX(${-previewIndex * 215}px)` }}>
            <div className="theme-preview-card theme-preview-small">
              <img src="/placeholder.svg?height=353&width=174" alt="Theme preview" />
            </div>
            <div className="theme-preview-card theme-preview-large">
              <img src="/placeholder.svg?height=417&width=195" alt="Theme preview" />
            </div>
            <div className="theme-preview-card theme-preview-small">
              <img src="/placeholder.svg?height=353&width=174" alt="Theme preview" />
            </div>
          </div>
        </div>

        {/* Bottom Sheet */}
        <div className="theme-custom-sheet" style={{ height: getModalHeight() }}>
          <div className="theme-sheet-handle" />

          <div className="theme-sheet-content">
            {modalState === "minimized" && (
              <div className="theme-options-grid">
                <button className="theme-option-btn" onClick={() => setModalState("font")}>
                  <div className="theme-option-circle">
                    <div className="theme-option-dot" />
                  </div>
                  <span>Police</span>
                </button>
                <button className="theme-option-btn" onClick={() => setModalState("color")}>
                  <div className="theme-option-circle">
                    <div className="theme-option-dot" />
                  </div>
                  <span>Couleur</span>
                </button>
                <button className="theme-option-btn" onClick={() => setModalState("layout")}>
                  <div className="theme-option-circle">
                    <div className="theme-option-dot" />
                  </div>
                  <span>Mise en page</span>
                </button>
              </div>
            )}

            {modalState === "font" && (
              <div className="theme-modal-expanded">
                <div className="theme-modal-header">
                  <button className="theme-modal-back" onClick={() => setModalState("minimized")}>
                    <svg width="12" height="23" viewBox="0 0 12 23" fill="none">
                      <path d="M10 21L2 11.5L10 2" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  <h3>Police</h3>
                  <div style={{ width: "11.25px" }} />
                </div>

                <div className="theme-font-settings">
                  {/* Font Size Slider */}
                  <div className="font-size-section">
                    <label>Taille du texte dans l'application</label>
                    <div className="font-size-slider-container">
                      <span className="font-size-label-small">A</span>
                      <input
                        type="range"
                        min="0"
                        max="4"
                        value={fontSize}
                        onChange={(e) => {
                          setFontSize(Number.parseInt(e.target.value))
                          handleChange()
                        }}
                        className="font-size-slider"
                      />
                      <span className="font-size-label-large">A</span>
                    </div>
                  </div>

                  {/* Font Family */}
                  <div className="font-family-section">
                    <label>Police</label>
                    <div className="font-options">
                      {["Inter", "Nunito", "SF Pro"].map((font) => (
                        <button
                          key={font}
                          className={`font-option ${fontFamily === font ? "selected" : ""}`}
                          onClick={() => {
                            setFontFamily(font)
                            handleChange()
                          }}
                        >
                          {font}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Weight */}
                  <div className="font-weight-section">
                    <label>Épaisseur</label>
                    <div className="font-options">
                      {["Light", "Medium", "Bold"].map((weight) => (
                        <button
                          key={weight}
                          className={`font-option ${fontWeight === weight ? "selected" : ""}`}
                          style={{ fontWeight: weight === "Light" ? 300 : weight === "Medium" ? 500 : 700 }}
                          onClick={() => {
                            setFontWeight(weight)
                            handleChange()
                          }}
                        >
                          {weight}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {modalState === "color" && (
              <div className="theme-modal-expanded">
                <div className="theme-modal-header">
                  <button className="theme-modal-back" onClick={() => setModalState("minimized")}>
                    <svg width="12" height="23" viewBox="0 0 12 23" fill="none">
                      <path d="M10 21L2 11.5L10 2" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  <h3>Couleur d'accentuation</h3>
                  <div style={{ width: "11.25px" }} />
                </div>

                <div className="accent-colors-grid">
                  {accentColors.map(({ id, color, isCustom }) => (
                    <button
                      key={id}
                      className={`accent-color-btn ${accentColor === color ? "selected" : ""}`}
                      style={{ background: isCustom ? "white" : color }}
                      onClick={() => {
                        if (!isCustom) {
                          setAccentColor(color)
                          handleChange()
                        }
                      }}
                    >
                      {isCustom ? (
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                          <path
                            d="M2 13L6 9M6 9L9 6L13 2L6 9Z"
                            stroke="#8FC8FF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : accentColor === color ? (
                        <div className="accent-color-inner" />
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {modalState === "layout" && (
              <div className="theme-modal-expanded">
                <div className="theme-modal-header">
                  <button className="theme-modal-back" onClick={() => setModalState("minimized")}>
                    <svg width="12" height="23" viewBox="0 0 12 23" fill="none">
                      <path d="M10 21L2 11.5L10 2" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  <h3>Mise en page</h3>
                  <div style={{ width: "11.25px" }} />
                </div>

                <div className="layout-settings">
                  <label>Espacement</label>
                  <div className="spacing-options">
                    {[
                      { value: "Compact", gap: 3 },
                      { value: "Comfortable", gap: 5 },
                      { value: "Spacieux", gap: 7 },
                    ].map(({ value, gap }) => (
                      <button
                        key={value}
                        className={`spacing-option ${spacing === value ? "selected" : ""}`}
                        onClick={() => {
                          setSpacing(value)
                          handleChange()
                        }}
                      >
                        <div className="spacing-lines" style={{ gap: `${gap}px` }}>
                          <div className="spacing-line" />
                          <div className="spacing-line" />
                          <div className="spacing-line" />
                        </div>
                        <span>{value}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Button Footer */}
        <div className="theme-custom-footer">
          <Button variant="primary" fullWidth disabled={!hasChanges} onClick={handleSave}>
            Sauvegarder
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ThemeCustomizationModal
