import "./PostModal.css"

export const PostModal = ({ post, onClose, onOpenDetails }) => {
  if (!post) return null

  const handleModalClick = (e) => {
    if (e.target.closest(".post-modal-overlay")) {
      return
    }
    if (onOpenDetails) {
      onOpenDetails(post)
    }
  }

  return (
    <>
      <div className="post-modal-overlay" onClick={onClose} />

      <div className="post-modal-wrapper">
        <div className="post-modal" onClick={handleModalClick} style={{ cursor: "pointer" }}>
          {/* Image avec overlay */}
          <div className="post-modal-image-container">
            <img
              src={
                post.images?.[0] ||
                post.image ||
                "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=200&fit=crop"
              }
              alt={post.title}
              className="post-modal-image"
            />
            <div className="post-modal-image-overlay" />
          </div>

          {/* Contenu */}
          <div className="post-modal-content">
            <div className="post-modal-text">
              <h3 className="post-modal-title">{post.title || "Sortie automnale au parc"}</h3>
              <p className="post-modal-description">
                {post.description || post.content?.substring(0, 60) + "..." || "Description du post ici"}
              </p>
            </div>

            <div className="post-modal-user-row">
              <div className="post-modal-user">
                <img
                  src={post.user?.avatar || "/avatar.jpeg"}
                  alt={post.user?.name}
                  className="post-modal-avatar"
                />
                <span className="post-modal-username">@{post.user?.name || "user34"}</span>
              </div>
              <span className="post-modal-time">{post.time || "2min"}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostModal
