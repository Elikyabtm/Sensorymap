"use client"

import { useState, useEffect } from "react"
import { Icon } from "./ui/Icon"
import "../styles/SearchPage.css"

const SearchPage = ({ onClose, places, onPlaceSelect, onCategoryFilter, selectedCategoryProp }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [recentSearches, setRecentSearches] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryProp || null)

  useEffect(() => {
    const saved = localStorage.getItem("searchHistory")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (selectedCategoryProp !== undefined) {
      setSelectedCategory(selectedCategoryProp)
    }
  }, [selectedCategoryProp])

  const addToHistory = (placeName) => {
    const updated = [placeName, ...recentSearches.filter((s) => s !== placeName)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem("searchHistory", JSON.stringify(updated))
  }

  const filteredPlaces = searchQuery.trim()
    ? places.filter(
        (place) =>
          place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          place.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : []

  const nearbyPlaces = places.slice(0, 3)

  const categories = [...new Set(places.map((p) => p.category))]

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null)
      if (onCategoryFilter) {
        onCategoryFilter(null)
      }
    } else {
      setSelectedCategory(category)
      if (onCategoryFilter) {
        onCategoryFilter(category)
      }
    }
  }

  const handlePlaceClick = (place) => {
    addToHistory(place.name)
    if (onPlaceSelect) {
      onPlaceSelect(place)
    }
    onClose()
  }

  const handleRecentSearchClick = (searchTerm) => {
    const place = places.find((p) => p.name === searchTerm)
    if (place) {
      handlePlaceClick(place)
    }
  }

  return (
    <div className="search-page">
      <div className="search-page-header">
        <div className="search-input-container">
          <Icon name="search" size={25} color="#4F70B5" />
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher une adresse..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>
        <button className="search-close-button" onClick={onClose}>
          <Icon name="close" size={24} color="#445E9A" />
        </button>
      </div>

      <div className="search-categories">
        {categories.slice(0, 4).map((category, index) => (
          <button
            key={index}
            className={`search-category-badge ${selectedCategory === category ? "active" : ""}`}
            onClick={() => handleCategoryClick(category)}
          >
            <Icon name="heart" size={20} color={selectedCategory === category ? "#364A78" : "#445E9A"} />
            <span>{category}</span>
          </button>
        ))}
      </div>

      <div className="search-content">
        {searchQuery.trim() && (
          <div className="search-section">
            <h3 className="search-section-title">Résultats ({filteredPlaces.length})</h3>
            <div className="search-list">
              {filteredPlaces.length > 0 ? (
                filteredPlaces.map((place) => (
                  <div key={place.id} className="search-list-item" onClick={() => handlePlaceClick(place)}>
                    <span>{place.name}</span>
                    <span className="search-list-item-category">{place.category}</span>
                  </div>
                ))
              ) : (
                <div className="search-list-item">Aucun résultat trouvé</div>
              )}
            </div>
          </div>
        )}

        {!searchQuery.trim() && recentSearches.length > 0 && (
          <div className="search-section">
            <h3 className="search-section-title">Recherches récentes</h3>
            <div className="search-list">
              {recentSearches.map((search, index) => (
                <div key={index} className="search-list-item" onClick={() => handleRecentSearchClick(search)}>
                  <Icon name="circle" size={24} color="#2A3556" />
                  <span>{search}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!searchQuery.trim() && (
          <div className="search-section">
            <h3 className="search-section-title">À proximité</h3>
            <div className="search-list">
              {nearbyPlaces.map((place) => (
                <div key={place.id} className="search-list-item" onClick={() => handlePlaceClick(place)}>
                  <span>{place.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!searchQuery.trim() && (
          <div className="search-section">
            <div className="search-section-header">
              <h3 className="search-section-title">Les recommandations de l'équipe</h3>
              <Icon name="arrowRight" size={24} color="#2A3556" />
            </div>
            <div className="search-recommendations">
              {places
                .filter((p) => p.type === "certified")
                .slice(0, 2)
                .map((place) => (
                  <div key={place.id} className="drawer-card" onClick={() => handlePlaceClick(place)}>
                    <div className="drawer-card-image">
                      <div className="drawer-card-badge">
                        <Icon name="star" size={12} color="#FFFFFF" />
                      </div>
                      <img src={place.image || "/placeholder.svg"} alt={place.name} />
                    </div>
                    <div className="drawer-card-content">
                      <h4>{place.name}</h4>
                      <div className="drawer-card-footer">
                        <div className="drawer-card-indicators">
                          <div
                            className="sense-indicator"
                            style={{ backgroundColor: "#B597F6", width: `${place.senses.light}%` }}
                          />
                          <div
                            className="sense-indicator"
                            style={{ backgroundColor: "#BEDC9E", width: `${place.senses.sound}%` }}
                          />
                          <div
                            className="sense-indicator"
                            style={{ backgroundColor: "#F56E38", width: `${place.senses.crowd}%` }}
                          />
                        </div>
                        <button className="drawer-card-bookmark">
                          <Icon name="heart" size={20} color="#FFFFFF" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage
