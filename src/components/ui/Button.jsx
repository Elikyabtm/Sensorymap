import { useState } from "react"
import "../../styles/design-tokens.css"
import "./Button.css"

export const Button = ({
  variant = "primary",
  fullWidth = false,
  disabled = false,
  children,
  onClick,
  className = "",
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false)

  const classes = `button button-${variant} ${disabled ? "button-disabled" : isPressed ? "button-pressed" : "button-default"
    } ${fullWidth ? "button-full-width" : ""} ${className}`

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => !disabled && setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      {...props}
    >
      {children}
    </button>
  )
}
