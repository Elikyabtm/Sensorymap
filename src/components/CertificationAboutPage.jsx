"use client"

import { Icon } from "./ui/Icon"
import "../styles/CertificationAboutPage.css"

export function CertificationAboutPage({ onClose }) {
  const criteriaCards = [
    {
      icon: "users",
      title: "Personnel sensibilisé",
      description: "Équipe formée et à l'écoute.",
    },
    {
      icon: "sound",
      title: "Ambiance sonore maîtrisée",
      description: "Musiques et bruits modérés",
    },
    {
      icon: "light",
      title: "Éclairage doux",
      description: "Peu de contrastes agressifs, lumière adaptée",
    },
    {
      icon: "clock",
      title: "Temps calmes disponibles",
      description: "Moments ou horaires avec moins d'affluence",
    },
    {
      icon: "space",
      title: "Espaces confortables",
      description: "Circulation fluide, possibilité de s'isoler ou de s'asseoir tranquillement.",
    },
  ]

  return (
    <div className="certification-about-page">
      <div className="certification-about-header">
        <button className="certification-about-back" onClick={onClose}>
          <Icon name="arrowLeft" size={24} color="#364A78" />
        </button>
        <h1 className="certification-about-title">Label "Lieu Serein"</h1>
        <div className="certification-about-logo">
          <Icon name="logo" size={48} color="#5A9E9E" />
        </div>
      </div>

      <div className="certification-about-content">
        {/* Section: Qu'est ce que ce label ? */}
        <section className="certification-section">
          <h2 className="certification-section-title">Qu'est ce que ce label ?</h2>
          <p className="certification-section-text">
            Le label "Lieu serein" identifie des endroits offrant calme, confort et accueil bienveillant. 
            Chaque lieu est sélectionné avec soin par notre équipe pour que les personnes neurodivergentes 
            et sensibles à l'environnement s'y sentent à l'aise.
          </p>
          <div className="certification-accent-box">
            <p>
              Le label n'est pas seulement décoratif : il reflète une démarche réelle de qualité d'accueil 
              et de gestion de l'espace.
            </p>
          </div>
        </section>

        {/* Section: Comment l'audit est effectué */}
        <section className="certification-section">
          <h2 className="certification-section-title">Comment l'audit est effectué</h2>
          <p className="certification-section-text">
            Pour attribuer le label, notre équipe évalue chaque lieu :
          </p>
          <ul className="certification-audit-list">
            <li>
              <Icon name="logo" size={20} color="#5A9E9E" />
              <span><strong>Visite sur place</strong> : espace, bruit, lumière et agencement</span>
            </li>
            <li>
              <Icon name="logo" size={20} color="#5A9E9E" />
              <span><strong>Entretien avec le personnel</strong> : sensibilisation aux besoins spécifiques</span>
            </li>
            <li>
              <Icon name="logo" size={20} color="#5A9E9E" />
              <span><strong>Retours utilisateurs</strong> : expérience et scénarios concrets</span>
            </li>
          </ul>
          <div className="certification-accent-box">
            <p>
              Chaque critère doit être respecté pour que le lieu obtienne la certification. 
              Nous voulons garantir que le label représente une expérience réellement sereine.
            </p>
          </div>
        </section>

        {/* Section: Contenu du cahier des charges */}
        <section className="certification-section">
          <h2 className="certification-section-title">Contenu du cahier des charges</h2>
          <p className="certification-section-text">
            Contenu du cahier des charges<br />
            Le label repose sur plusieurs critères concrets, que nous évaluons systématiquement :
          </p>
          <div className="certification-criteria-cards">
            {criteriaCards.map((card, index) => (
              <div key={index} className="certification-criteria-card">
                <div className="certification-criteria-icon">
                  <Icon name={card.icon} size={24} color="#364A78" />
                </div>
                <div className="certification-criteria-content">
                  <span className="certification-criteria-title">{card.title}</span>
                  <span className="certification-criteria-description">{card.description}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="certification-accent-box">
            <p>
              Chaque critère doit être respecté pour que le lieu obtienne la certification. 
              Nous voulons garantir que le label représente une expérience réellement sereine.
            </p>
          </div>
        </section>

        {/* Section: Faire certifier votre lieu */}
        <section className="certification-section">
          <h2 className="certification-section-title">Faire certifier votre lieu</h2>
          <p className="certification-section-text">
            Vous êtes propriétaire ou gestionnaire d'un espace et souhaitez obtenir le label "Lieu serein" ?
          </p>
          <p className="certification-section-text">
            Notre équipe vous accompagne dans le processus de certification : audit, conseils d'aménagement et suivi.
          </p>
          <button className="certification-cta-button">
            Contactez-nous pour certifier votre lieu
          </button>
        </section>
      </div>

      {/* Footer */}
      <footer className="certification-footer">
        <p>© 2026 — Nuance</p>
        <p>Un service soutenu par la FFPP — Fédération Française des Psychologues et de Psychologie</p>
        <div className="certification-footer-logo">
          <Icon name="logo" size={32} color="white" />
        </div>
      </footer>
    </div>
  )
}
