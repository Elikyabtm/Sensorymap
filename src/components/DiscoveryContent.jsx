import { Icon } from "./ui"

export default function DiscoveryContent() {
  return (
    <>
      {/* Recommandations de l'équipe - Section 1 */}
      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Les recommandations de l'équipe</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div className="carousel-cards">
          {[1, 2, 3].map((i) => (
            <div key={i} className="spot-card">
              <div className="spot-image">
                <div className="spot-badge">
                  <Icon name="star" size={16} color="white" />
                </div>
              </div>
              <div className="spot-content">
                <div className="spot-info">
                  <h4 className="spot-title">Musée du quai</h4>
                </div>
                <div className="spot-footer">
                  <div className="sensory-datavis">
                    <div className="datavis-bar" style={{ backgroundColor: "#B597F6" }} />
                    <div className="datavis-bar" style={{ backgroundColor: "#BEDC9E" }} />
                    <div className="datavis-bar" style={{ backgroundColor: "#FFA576" }} />
                  </div>
                  <button className="spot-bookmark">
                    <Icon name="heart" size={18} color="rgba(255, 255, 255, 0.7)" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Listes */}
      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Listes</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div className="carousel-cards">
          {[1, 2, 3].map((i) => (
            <div key={i} className="list-item">
              <img className="list-bg-image" src={`https://picsum.photos/160/200?random=${i}`} alt="Liste" />
              <div className="list-overlay">
                <h4 className="list-text">
                  Restaurants calmes du 10<sup>e</sup>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommandations de l'équipe - Section 2 */}
      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Les recommandations de l'équipe</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div className="carousel-cards">
          {[4, 5, 6].map((i) => (
            <div key={i} className="spot-card">
              <div className="spot-image">
                <div className="spot-badge">
                  <Icon name="star" size={16} color="white" />
                </div>
              </div>
              <div className="spot-content">
                <div className="spot-info">
                  <h4 className="spot-title">Musée du quai</h4>
                </div>
                <div className="spot-footer">
                  <div className="sensory-datavis">
                    <div className="datavis-bar" style={{ backgroundColor: "#B597F6" }} />
                    <div className="datavis-bar" style={{ backgroundColor: "#BEDC9E" }} />
                    <div className="datavis-bar" style={{ backgroundColor: "#FFA576" }} />
                  </div>
                  <button className="spot-bookmark">
                    <Icon name="heart" size={18} color="rgba(255, 255, 255, 0.7)" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommandations de l'équipe - Section 3 */}
      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Les recommandations de l'équipe</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div className="carousel-cards">
          {[7, 8, 9].map((i) => (
            <div key={i} className="spot-card">
              <div className="spot-image">
                <div className="spot-badge">
                  <Icon name="star" size={16} color="white" />
                </div>
              </div>
              <div className="spot-content">
                <div className="spot-info">
                  <h4 className="spot-title">Musée du quai</h4>
                </div>
                <div className="spot-footer">
                  <div className="sensory-datavis">
                    <div className="datavis-bar" style={{ backgroundColor: "#B597F6" }} />
                    <div className="datavis-bar" style={{ backgroundColor: "#BEDC9E" }} />
                    <div className="datavis-bar" style={{ backgroundColor: "#FFA576" }} />
                  </div>
                  <button className="spot-bookmark">
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
