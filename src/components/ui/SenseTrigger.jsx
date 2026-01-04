"use client"
import "./SenseTrigger.css"

const SenseTrigger = ({ type, label, selected, onClick, ...props }) => {
  const senseConfig = {
    light: {
      icon: "⚡",
      color: "#B597F6",
      bgVar: selected
        ? "var(--components-select-triggers-focused-light-fill)"
        : "var(--components-select-triggers-default-light-fill)",
      strokeVar: selected
        ? "var(--components-select-triggers-focused-light-stroke)"
        : "var(--components-select-triggers-default-light-stroke)",
      textVar: selected
        ? "var(--components-select-triggers-focused-light-text)"
        : "var(--components-select-triggers-default-light-text)",
    },
    sound: {
      icon: "👂",
      color: "#90C359",
      bgVar: selected
        ? "var(--components-select-triggers-focused-sound-fill)"
        : "var(--components-select-triggers-default-sound-fill)",
      strokeVar: selected
        ? "var(--components-select-triggers-focused-sound-stroke)"
        : "var(--components-select-triggers-default-sound-stroke)",
      textVar: selected
        ? "var(--components-select-triggers-focused-sound-text)"
        : "var(--components-select-triggers-default-sound-text)",
    },
    crowd: {
      icon: "👥",
      color: "#FF8D60",
      bgVar: selected
        ? "var(--components-select-triggers-focused-crowd-fill)"
        : "var(--components-select-triggers-default-crowd-fill)",
      strokeVar: selected
        ? "var(--components-select-triggers-focused-crowd-stroke)"
        : "var(--components-select-triggers-default-crowd-stroke)",
      textVar: selected
        ? "var(--components-select-triggers-focused-crowd-text)"
        : "var(--components-select-triggers-default-crowd-text)",
    },
  }

  const config = senseConfig[type]

  return (
    <button
      className="sense-trigger"
      data-selected={selected}
      onClick={onClick}
      style={{
        background: config.bgVar,
        border: `1px solid ${config.strokeVar}`,
      }}
      {...props}
    >
      <div className="sense-icon-container" style={{ boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.15)" }}>
        <div className="sense-icon-circle" style={{ background: config.color }} />
        <div className="sense-icon-emoji">{config.icon}</div>
      </div>
      <div className="sense-label" style={{ color: config.textVar }}>
        {label}
      </div>
    </button>
  )
}

export default SenseTrigger
