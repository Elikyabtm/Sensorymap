"use client"

import "../styles/CommunityContent.css"
import { Icon } from "./ui"
import placesData from "../data/places.json"
import { filterPlacesBySenses } from "../utils/senseFilters"
import { mockPosts, mockEvents } from "../data/communityData"

export default function CommunityContent({ selectedSenses, selectedCategory, onCategoryClick }) {
  const filteredPlaces = filterPlacesBySenses(
    placesData,
    selectedSenses || { light: false, sound: false, crowd: false },
  ).filter((place) => !selectedCategory || place.category === selectedCategory)

  const certifiedPlaces = filteredPlaces.filter((place) => place.type === "certified")

  const categories = [
    { name: "Café", icon: "cafe" },
    { name: "Restaurant", icon: "restaurant" },
    { name: "Musée", icon: "museum" },
    { name: "Parc", icon: "park" },
    { name: "Bibliothèque", icon: "library" },
    { name: "Bar", icon: "bar" },
  ]

  const getSenseBarStyle = (value, color) => {
    const percentage = ((100 - value) / 100) * 100 // Inverse: plus la valeur est faible, plus la barre est longue
    return {
      background: `linear-gradient(to right, ${color} ${percentage}%, rgba(${color === "#9A7AC1" ? "154, 122, 193" : color === "#D77A4F" ? "215, 122, 79" : "79, 161, 161"}, 0.2) ${percentage}%)`,
      width: "100%",
      height: "8px",
      borderRadius: "1000px",
    }
  }

  const getSenseBarLevel = (value) => {
    // Inverse: plus la valeur est faible, plus le niveau est élevé
    const level = ((100 - value) / 100) * 30 // 30px est la hauteur totale
    return {
      height: level,
      top: 30 - level,
    }
  }

  const getSenseColors = (senseType) => {
    const colors = {
      light: {
        primary: "var(--components-sensory_bar-light-primary, #9A7AC1)",
        secondary: "var(--components-sensory_bar-light-secondary, rgba(154, 122, 193, 0.2))",
      },
      sound: {
        primary: "var(--components-sensory_bar-noise-primary, #D77A4F)",
        secondary: "var(--components-sensory_bar-noise-secondary, rgba(215, 122, 79, 0.2))",
      },
      crowd: {
        primary: "var(--components-sensory_bar-crowd-primary, #4FA1A1)",
        secondary: "var(--components-sensory_bar-crowd-secondary, rgba(79, 161, 161, 0.2))",
      },
    }
    return colors[senseType]
  }

  return (
    <>
      <div className="drawer-filters">
        {categories.map((cat) => (
          <div key={cat.name} className="filter-item">
            <button
              className={`filter-circle ${selectedCategory === cat.name ? "active" : ""}`}
              onClick={() => onCategoryClick(cat.name)}
            >
              <Icon name={cat.icon} size={36} color={selectedCategory === cat.name ? "white" : "#364A78"} />
            </button>
            <span className="filter-label">{cat.name}</span>
          </div>
        ))}
      </div>

      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Sorties à venir</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div className="carousel-cards">
          {mockEvents.map((event) => (
            <div key={event.id} className="community-event-card">
              <div className="community-event-date">{event.date}</div>
              <div className="community-event-body">
                <div className="community-event-title">{event.title}</div>
                <div className="community-event-users">
                  <img src="/placeholder.svg?height=32&width=32" alt="" className="community-user-avatar" />
                  <img
                    src="/placeholder.svg?height=32&width=32"
                    alt=""
                    className="community-user-avatar community-user-avatar-overlap"
                  />
                  <img
                    src="/placeholder.svg?height=32&width=32"
                    alt=""
                    className="community-user-avatar community-user-avatar-overlap"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Les recommandations de l'équipe</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div className="carousel-cards">
          {certifiedPlaces.slice(0, 3).map((place) => (
            <div key={place.id} className="community-certified-card">
              <div className="community-certified-img">
                <div className="community-certified-badge">
                  <Icon name="certified" size={16} color="#000" />
                  <span>Lieu serein</span>
                </div>
              </div>
              <div className="community-certified-body">
                <div className="community-certified-title">{place.name}</div>
                <div className="community-certified-footer">
                  <div
                    style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 4, height: 30 }}
                  >
                    {/* Barre Lumière */}
                    <div
                      style={{
                        width: 30,
                        height: 8,
                        position: "relative",
                        transform: "rotate(-90deg)",
                        transformOrigin: "bottom left",
                      }}
                    >
                      <div
                        style={{
                          width: 30,
                          height: 8,
                          left: 0,
                          top: 0,
                          position: "absolute",
                          background: getSenseColors("light").secondary,
                          borderRadius: 1000,
                        }}
                      />
                      <div
                        style={{
                          width: ((100 - place.senses.light) / 100) * 30,
                          height: 8,
                          left: 0,
                          top: 0,
                          position: "absolute",
                          background: getSenseColors("light").primary,
                          borderRadius: 1000,
                        }}
                      />
                    </div>

                    {/* Barre Son */}
                    <div
                      style={{
                        width: 30,
                        height: 8,
                        position: "relative",
                        transform: "rotate(-90deg)",
                        transformOrigin: "bottom left",
                      }}
                    >
                      <div
                        style={{
                          width: 30,
                          height: 8,
                          left: 0,
                          top: 0,
                          position: "absolute",
                          background: getSenseColors("sound").secondary,
                          borderRadius: 1000,
                        }}
                      />
                      <div
                        style={{
                          width: ((100 - place.senses.sound) / 100) * 30,
                          height: 8,
                          left: 0,
                          top: 0,
                          position: "absolute",
                          background: getSenseColors("sound").primary,
                          borderRadius: 1000,
                        }}
                      />
                    </div>

                    {/* Barre Foule */}
                    <div
                      style={{
                        width: 30,
                        height: 8,
                        position: "relative",
                        transform: "rotate(-90deg)",
                        transformOrigin: "bottom left",
                      }}
                    >
                      <div
                        style={{
                          width: 30,
                          height: 8,
                          left: 0,
                          top: 0,
                          position: "absolute",
                          background: getSenseColors("crowd").secondary,
                          borderRadius: 1000,
                        }}
                      />
                      <div
                        style={{
                          width: ((100 - place.senses.crowd) / 100) * 30,
                          height: 8,
                          left: 0,
                          top: 0,
                          position: "absolute",
                          background: getSenseColors("crowd").primary,
                          borderRadius: 1000,
                        }}
                      />
                    </div>
                  </div>
                  <button className="community-favorite-btn">
                    <Icon name="heart" size={18} color="#2A3556" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Derniers posts</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div className="community-posts-list">
          {mockPosts.slice(0, 2).map((post) => (
            <div key={post.id} className="community-post-card">
              <div className="community-post-image" />
              <div className="community-post-body">
                <div className="community-post-text">
                  <div className="community-post-title">Titre du post</div>
                  <div className="community-post-description">Description ici</div>
                </div>
                <div className="community-post-footer">
                  <img src="/placeholder.svg?height=32&width=32" alt="" className="community-post-avatar" />
                  <span className="community-post-username">@user34</span>
                  <span className="community-post-time">2min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-section">
        <div className="carousel-header">
          <h3 className="carousel-title">Les recommandations de l'équipe</h3>
          <Icon name="arrowRight" size={20} color="#2A3556" />
        </div>
        <div className="carousel-cards">
          {filteredPlaces.slice(0, 3).map((place) => (
            <div key={place.id} className="community-spot-card">
              <div className="community-spot-image" />
              <div className="community-spot-content">
                <div className="community-spot-title">{place.name}</div>
                <div className="community-spot-footer">
                  <div
                    style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 4, height: 30 }}
                  >
                    {["light", "sound", "crowd"].map((senseType) => (
                      <div
                        key={senseType}
                        style={{
                          width: 30,
                          height: 8,
                          position: "relative",
                          transform: "rotate(-90deg)",
                          transformOrigin: "bottom left",
                        }}
                      >
                        <div
                          style={{
                            width: 30,
                            height: 8,
                            left: 0,
                            top: 0,
                            position: "absolute",
                            background: getSenseColors(senseType).secondary,
                            borderRadius: 1000,
                          }}
                        />
                        <div
                          style={{
                            width: ((100 - place.senses[senseType]) / 100) * 30,
                            height: 8,
                            left: 0,
                            top: 0,
                            position: "absolute",
                            background: getSenseColors(senseType).primary,
                            borderRadius: 1000,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <button className="community-favorite-btn">
                    <Icon name="heart" size={16} color="#2A3556" />
                  </button>
                </div>
              </div>
              <div className="community-spot-badge">star</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
