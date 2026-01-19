import { Icon } from "./Icon"
import "../../styles/ShareModal.css"

export default function ShareModal({ isOpen, onClose, shareUrl }) {
  if (!isOpen) return null

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shareUrl)
  }

  const handleShare = (platform) => {

  }

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div className="share-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="share-modal-title">Partager</h2>

        <div className="share-platforms">
          <button className="share-platform-button instagram" onClick={() => handleShare("instagram")}>
            <div className="instagram-gradient" />
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="platform-icon">
              <rect width="40" height="40" rx="12" fill="url(#instagram-gradient)" />
              <rect x="12" y="12" width="16" height="16" rx="4" stroke="white" strokeWidth="2" fill="none" />
              <circle cx="20" cy="20" r="4" stroke="white" strokeWidth="2" fill="none" />
              <circle cx="26" cy="14" r="1.5" fill="white" />
            </svg>
          </button>

          <button className="share-platform-button whatsapp" onClick={() => handleShare("whatsapp")}>
            <div className="whatsapp-bg" />
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="platform-icon">
              <circle cx="20" cy="20" r="18" fill="#00E510" />
              <path
                d="M20 12C15.5 12 12 15.5 12 20C12 21.5 12.5 23 13.5 24L12.5 28L16.5 27C17.5 27.5 18.7 28 20 28C24.5 28 28 24.5 28 20C28 15.5 24.5 12 20 12Z"
                fill="white"
              />
            </svg>
          </button>

          <button className="share-platform-button messenger" onClick={() => handleShare("messenger")}>
            <div className="messenger-gradient" />
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="platform-icon">
              <circle cx="20" cy="20" r="18" fill="url(#messenger-gradient)" />
              <path d="M20 14L14 22H18L16 26L22 18H18L20 14Z" fill="white" />
            </svg>
          </button>

          <button className="share-platform-button snapchat" onClick={() => handleShare("snapchat")}>
            <div className="snapchat-bg" />
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="platform-icon">
              <circle cx="20" cy="20" r="18" fill="#FFFA00" />
              <path
                d="M20 15C18.5 15 17 16 17 18C17 19 16 19 15.5 19C15 19 14.5 19.5 14.5 20C14.5 20.5 15 21 15.5 21H24.5C25 21 25.5 20.5 25.5 20C25.5 19.5 25 19 24.5 19C24 19 23 19 23 18C23 16 21.5 15 20 15Z"
                fill="#1D1D1B"
              />
            </svg>
          </button>

          <button className="share-platform-button more" onClick={() => handleShare("more")}>
            <Icon name="dots" size={34} color="#2A3556" />
          </button>
        </div>

        <div className="share-url-field">
          <input type="text" value={shareUrl} readOnly className="share-url-input" />
          <button className="share-copy-button" onClick={handleCopyUrl}>
            <Icon name="copy" size={25} color="#4F70B5" />
          </button>
        </div>

        <div className="share-modal-spacer" />
      </div>
    </div>
  )
}
