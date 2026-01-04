import "../../styles/design-tokens.css"
import "./ProgressBar.css"

export const ProgressBar = ({ current, total = 4, progress, className = "" }) => {
  // Si progress est fourni directement, l'utiliser, sinon calculer depuis current/total
  const progressValue = progress !== undefined ? progress : (current / total) * 100

  return (
    <div className={`progress-bar-container ${className}`}>
      <div className="progress-bar-fill" style={{ width: `${progressValue}%` }} />
    </div>
  )
}
