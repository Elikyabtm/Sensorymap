"use client"

import { useState } from "react"
import "./NextButton.css"

export default function NextButton({ onClick, disabled = false }) {
  const [isPressed, setIsPressed] = useState(false)

  const handlePointerDown = () => {
    if (!disabled) setIsPressed(true)
  }

  const handlePointerUp = () => {
    setIsPressed(false)
  }

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e)
    }
  }

  return (
    <button
      className={`next-button ${isPressed ? "pressed" : ""}`}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      disabled={disabled}
      data-state={isPressed ? "pressed" : "default"}
    >
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.5 6.5L16.5 12.5L9.5 18.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
