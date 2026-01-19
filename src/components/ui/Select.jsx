import { useState } from "react"
import "./Select.css"

export default function Select({
  value,
  onChange,
  options = [],
  placeholder = "Sélectionner",
  fullWidth = false,
  className = "",
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false)

  const handleClick = (optionValue) => {
    if (onChange) {
      onChange(optionValue)
    }
  }

  return (
    <div className={`select-container ${fullWidth ? "select-full-width" : ""} ${className}`}>
      {options.map((option) => {
        const isSelected = value === option.value

        return (
          <button
            key={option.value}
            type="button"
            className={`select-option ${isSelected ? "select-option-selected" : ""}`}
            onClick={() => handleClick(option.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          >
            <div className="select-option-text">{option.label}</div>
          </button>
        )
      })}
    </div>
  )
}
