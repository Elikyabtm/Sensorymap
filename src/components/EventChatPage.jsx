
import { useState } from "react"
import { Icon } from "./ui"
import "../styles/EventChatPage.css"

export default function EventChatPage({ event, onClose }) {
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState(event?.chatMessages || [
    { id: 1, user: "@username", avatar: "/woman-pink-hair-avatar.jpg", text: "I'm a pro, that's why 😎", time: "15:20 PM", isOwn: false },
    { id: 2, user: "@username", avatar: "/woman-blonde-avatar.jpg", text: "I'm a pro, that's why 😎", time: "15:20 PM", isOwn: true },
    { id: 3, user: "@username", avatar: "/woman-blue-hair-avatar.jpg", text: "I'm a pro, that's why 😎", time: "15:20 PM", isOwn: false },
  ])

  if (!event) return null

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    
    const now = new Date()
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} PM`
    
    const newMessage = {
      id: messages.length + 1,
      user: "@moi",
      avatar: "/woman-pink-hair-avatar.jpg",
      text: inputValue.trim(),
      time: timeStr,
      isOwn: true,
    }
    
    setMessages([...messages, newMessage])
    setInputValue("")
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="event-chat-page">
      <div className="event-chat-header">
        <button className="event-chat-back" onClick={onClose}>
          <Icon name="arrowLeft" size={30} color="#2A3556" />
        </button>
        <h1 className="event-chat-title">Chat</h1>
        <div className="event-chat-spacer" />
      </div>

      <div className="event-chat-content">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`event-chat-message ${message.isOwn ? "own" : "other"}`}
          >
            {!message.isOwn && (
              <img
                src={message.avatar || "/placeholder.svg"}
                alt={message.user}
                className="event-chat-avatar"
              />
            )}
            <div className="event-chat-bubble-container">
              <span className="event-chat-username">{message.user}</span>
              <div className={`event-chat-bubble ${message.isOwn ? "own" : "other"}`}>
                <span className="event-chat-text">{message.text}</span>
              </div>
              <span className="event-chat-time">{message.time}</span>
            </div>
            {message.isOwn && (
              <img
                src={message.avatar || "/placeholder.svg"}
                alt={message.user}
                className="event-chat-avatar"
              />
            )}
          </div>
        ))}
      </div>

      <div className="event-chat-input-container">
        <input
          type="text"
          className="event-chat-input"
          placeholder="Ecrire un message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="event-chat-send-btn"
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
        >
          <Icon name="send" size={20} color={inputValue.trim() ? "#5D82CF" : "#AFC0E6"} />
        </button>
      </div>
    </div>
  )
}
