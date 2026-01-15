"use client"

import { useState } from "react"

import { useRef, useEffect } from "react"
import { SenseTrigger, Typography, Icon } from "./ui"
import SenseBadge from "./ui/SenseBadge"

export default function SenseModal({ isOpen, onClose, selectedSenses, onToggleSense, windowHeight }) {
  const senseModalRef = useRef(null)
  const senseStartYRef = useRef(null)
  const senseStartHeightRef = useRef(null)
  const [senseModalHeight, setSenseModalHeight] = useState(0)
  const [isSenseModalDragging, setIsSenseModalDragging] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setSenseModalHeight(280)
    } else {
      setSenseModalHeight(0)
    }
  }, [isOpen])

  const handleSenseModalPointerDown = (e) => {
    setIsSenseModalDragging(true)
    senseStartYRef.current = e.clientY
    senseStartHeightRef.current = senseModalHeight
    e.target.setPointerCapture(e.pointerId)
  }

  const handleSenseModalPointerMove = (e) => {
    if (!isSenseModalDragging) return
    const deltaY = senseStartYRef.current - e.clientY
    const minHeight = 280
    const maxHeight = windowHeight * 0.85
    const newHeight = Math.max(minHeight, Math.min(maxHeight, senseStartHeightRef.current + deltaY))
    setSenseModalHeight(newHeight)
  }

  const handleSenseModalPointerUp = (e) => {
    setIsSenseModalDragging(false)
    if (e.target.hasPointerCapture(e.pointerId)) {
      e.target.releasePointerCapture(e.pointerId)
    }
  }

  const overlayOpacity = Math.min((senseModalHeight / (windowHeight * 0.85)) * 0.6, 0.6)

  if (!isOpen) return null

  return (
    <div>
      <div
        className="sense-modal-overlay"
        style={{ background: `rgba(0, 0, 0, ${overlayOpacity})` }}
        onClick={onClose}
      />

      <div
        ref={senseModalRef}
        className="sense-modal-drawer-figma"
        style={{ height: `${senseModalHeight}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle draggable */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingTop: "12px",
            paddingBottom: "12px",
            cursor: "grab",
            touchAction: "none",
          }}
          onPointerDown={handleSenseModalPointerDown}
          onPointerMove={handleSenseModalPointerMove}
          onPointerUp={handleSenseModalPointerUp}
          onPointerCancel={handleSenseModalPointerUp}
        >
          <div
            style={{
              width: "40px",
              height: "0px",
              outline: "2.50px var(--components-bottom_sheets-handle, #979797) solid",
              outlineOffset: "-1.25px",
            }}
          ></div>
        </div>

        {/* Header avec titre et bouton fermer */}
        <div
          style={{
            alignSelf: "stretch",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "12px",
          }}
        >
          <div style={{ width: "11.25px", height: "22.50px", opacity: 0 }} />
          <Typography variant="h3" weight="bold" color="primary">
            Ce que je veux éviter
          </Typography>
          <div
            onClick={onClose}
            style={{
              width: "35px",
              height: "35px",
              padding: "12px",
              background: "var(--components-button-exit-default-fill, #E4EAF7)",
              borderRadius: "1000px",
              outline: "1px var(--components-button-exit-default-stroke, rgba(255, 255, 255, 0)) solid",
              outlineOffset: "-1px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              display: "flex",
              cursor: "pointer",
            }}
          >
            <Icon name="close" size={18} color="#2f2f2f" />
          </div>
        </div>

        {/* Scrollable content */}
        <div
          style={{
            alignSelf: "stretch",
            paddingLeft: "20px",
            paddingRight: "20px",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "12px",
            display: "flex",
            overflowY: "auto",
            flex: 1,
          }}
        >
          {/* Section SenseTrigger */}
          <div
            style={{
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "18px",
              display: "flex",
            }}
          >
            <SenseTrigger
              type="light"
              label="Lumière"
              selected={selectedSenses.light}
              onClick={() => onToggleSense("light")}
            />
            <SenseTrigger
              type="sound"
              label="Bruit"
              selected={selectedSenses.sound}
              onClick={() => onToggleSense("sound")}
            />
            <SenseTrigger
              type="crowd"
              label="Foule"
              selected={selectedSenses.crowd}
              onClick={() => onToggleSense("crowd")}
            />
          </div>

          {/* Section légende des triggers */}
          <div
            style={{
              alignSelf: "stretch",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "22px",
              display: "flex",
            }}
          >
            <Typography variant="h4" weight="bold" color="primary" style={{ alignSelf: "stretch" }}>
              Titre de légende des triggers
            </Typography>

            <div
              style={{
                alignSelf: "stretch",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "18px",
                display: "flex",
              }}
            >
              {/* Lumière */}
              <div
                style={{
                  alignSelf: "stretch",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: "16px",
                  display: "flex",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "59px",
                    height: "59px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                    <Icon name="light" size={36} color="#9A7AC1" />
                </div>
                <div
                  style={{
                    flex: "1 1 0",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    display: "inline-flex",
                  }}
                >
                  <Typography variant="body" weight="semibold" color="primary" style={{ alignSelf: "stretch" }}>
                    Lumière
                  </Typography>
                  <Typography variant="body" weight="regular" color="primary" style={{ alignSelf: "stretch" }}>
                    Description du trigger lumière
                  </Typography>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "0",
                    position: "absolute",
                    bottom: "-9px",
                    left: 0,
                    outline: "1px var(--components-divider-color, #AFC0E6) solid",
                    outlineOffset: "-0.50px",
                  }}
                ></div>
              </div>


              {/* Bruit */}
              <div
                style={{
                  alignSelf: "stretch",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: "16px",
                  display: "flex",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "59px",
                    height: "59px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                    <Icon name="sound" size={36} color="#D77A4F" />
                </div>
                <div
                  style={{
                    flex: "1 1 0",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    display: "inline-flex",
                  }}
                >
                  <Typography variant="body" weight="semibold" color="primary" style={{ alignSelf: "stretch" }}>
                    Bruit
                  </Typography>
                  <Typography variant="body" weight="regular" color="primary" style={{ alignSelf: "stretch" }}>
                    Description du trigger bruit
                  </Typography>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "0",
                    position: "absolute",
                    bottom: "-9px",
                    left: 0,
                    outline: "1px var(--components-divider-color, #AFC0E6) solid",
                    outlineOffset: "-0.50px",
                  }}
                ></div>
              </div>



              {/* Foule */}
              <div
                style={{
                  alignSelf: "stretch",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: "16px",
                  display: "flex",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "59px",
                    height: "59px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                    <Icon name="crowd" size={36} color="#4FA1A1" />
                </div>
                <div
                  style={{
                    flex: "1 1 0",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    display: "inline-flex",
                  }}
                >
                  <Typography variant="body" weight="semibold" color="primary" style={{ alignSelf: "stretch" }}>
                    Foule
                  </Typography>
                  <Typography variant="body" weight="regular" color="primary" style={{ alignSelf: "stretch" }}>
                    Description du trigger foule
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer en bas */}
          <div style={{ width: "292px", height: "39px" }} />
        </div>
      </div>
    </div>
  )
}
