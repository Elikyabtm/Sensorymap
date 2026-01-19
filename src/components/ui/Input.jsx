import { useState } from "react"
import { Icon } from "./Icon"
import "./Input.css"

/**
 * Composant Input du design system basé sur le code Figma
 * @param {string} type - Type d'input (text, email, password, etc.)
 * @param {string} placeholder - Texte du placeholder
 * @param {string} value - Valeur de l'input
 * @param {function} onChange - Callback appelé lors du changement de valeur
 * @param {string} state - État de l'input: 'default', 'error', 'success'
 * @param {string} label - Label au-dessus de l'input
 * @param {string} error - Message d'erreur à afficher
 * @param {boolean} showPasswordToggle - Afficher le bouton pour voir/cacher le mot de passe
 * @param {boolean} disabled - Input désactivé
 * @param {string} className - Classes CSS additionnelles
 */
export const Input = ({
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  state = "default",
  label = "",
  error = "",
  showPasswordToggle = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Déterminer l'état visuel de l'input
  const getInputState = () => {
    if (error || state === "error") return "error"
    if (state === "success" || state === "ok") return "ok"
    if (isFocused) return "focused"
    if (value) return "filled"
    return "default"
  }

  const inputState = getInputState()
  const inputType = showPasswordToggle && !showPassword ? "password" : "text"

  return (
    <div className={`input-wrapper ${className}`}>
      {label && <label className="input-label">{label}</label>}

      <div className={`input-container input-state-${inputState}`}>
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className="input-field"
          {...props}
        />

        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            className="input-icon-button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            <Icon name={showPassword ? "eye" : "eyeclosed"} size={20} color="#445E9A" />
          </button>
        )}
      </div>

      {error && <div className="input-error-message">{error}</div>}
    </div>
  )
}

export default Input
