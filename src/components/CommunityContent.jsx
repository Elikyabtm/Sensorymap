import { Icon } from "./ui"

export default function CommunityContent() {
  return (
    <>

      {/* Section Sorties à venir */}
      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Sorties à venir</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div className="carousel-cards">
          {[1, 2, 3].map((i) => (
            <div key={i} className="event-card">
              <div className="event-date">17 oct.</div>
              <div className="event-title">Restaurant indien</div>
              <div className="event-badges">
                <div className="event-badge" style={{ backgroundColor: "#B597F6" }}>
                  <Icon name="light" size={14} color="white" />
                </div>
                <div className="event-badge" style={{ backgroundColor: "#BEDC9E" }}>
                  <Icon name="sound" size={14} color="white" />
                </div>
                <div className="event-badge" style={{ backgroundColor: "#FFA576" }}>
                  <Icon name="crowd" size={14} color="white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Les recommandations de l'équipe */}
      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Les recommandations de l'équipe</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div className="carousel-cards">
          {[1, 2].map((i) => (
            <div key={i} className="recommendation-card">
              <div className="recommendation-image">
                <div className="certified-badge">
                  <Icon name="star" size={16} color="white" />
                </div>
              </div>
              <div className="recommendation-content">
                <div className="recommendation-title">Musée du quai</div>
                <div className="recommendation-footer">
                  <div className="recommendation-indicators">
                    <div className="recommendation-indicator" style={{ backgroundColor: "#B597F6" }} />
                    <div className="recommendation-indicator" style={{ backgroundColor: "#BEDC9E" }} />
                    <div className="recommendation-indicator" style={{ backgroundColor: "#FFA576" }} />
                  </div>
                  <button className="recommendation-bookmark">
                    <Icon name="heart" size={18} color="rgba(255, 255, 255, 0.7)" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Derniers posts */}
      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Derniers posts</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "0 16px" }}>
          {[1, 2].map((i) => (
            <div key={i} className="post-item">
              <div className="post-image" />
              <div className="post-content">
                <div>
                  <div className="post-title">Titre du post</div>
                  <div className="post-description">Description ici</div>
                </div>
                <div className="post-time">Il y a 2min</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Les recommandations de l'équipe (répétée) */}
      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Les recommandations de l'équipe</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div className="carousel-cards">
          {[3, 4].map((i) => (
            <div key={i} className="recommendation-card">
              <div className="recommendation-image">
                <div className="certified-badge">
                  <Icon name="star" size={16} color="white" />
                </div>
              </div>
              <div className="recommendation-content">
                <div className="recommendation-title">Musée du quai</div>
                <div className="recommendation-footer">
                  <div className="recommendation-indicators">
                    <div className="recommendation-indicator" style={{ backgroundColor: "#B597F6" }} />
                    <div className="recommendation-indicator" style={{ backgroundColor: "#BEDC9E" }} />
                    <div className="recommendation-indicator" style={{ backgroundColor: "#FFA576" }} />
                  </div>
                  <button className="recommendation-bookmark">
                    <Icon name="heart" size={18} color="rgba(255, 255, 255, 0.7)" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
