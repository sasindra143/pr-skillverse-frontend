import { useState } from "react";
import "./VideoPlayer.css";

export default function VideoPlayer({ video }) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!video) {
    return (
      <div className="video-placeholder">
        Select a lesson to start watching
      </div>
    );
  }

  return (
    <div className="video-player-container">
      {/* ================= VIDEO ================= */}
      <div className="video-wrapper">
        <iframe
          src={`${video.videoUrl}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* ================= VIDEO META ================= */}
      <div className="video-meta">
        <h2>{video.title}</h2>

        <div className="trainer-row">
          <span className="trainer-name">
            {video.trainer || "Expert Trainer"}
          </span>
          <span className="tag">
            {video.category || "Core Java"}
          </span>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="lesson-tabs">
        <span
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </span>

        <span
          className={activeTab === "discussions" ? "active" : ""}
          onClick={() => setActiveTab("discussions")}
        >
          Discussions
        </span>

        <span
          className={activeTab === "reviews" ? "active" : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </span>
      </div>

      {/* ================= TAB CONTENT ================= */}
      <div className="lesson-content">
        {activeTab === "overview" && (
          <p className="lesson-description">
            {video.description ||
              "This lesson covers important concepts with clear explanations and real-world examples."}
          </p>
        )}

        {activeTab === "discussions" && (
          <p className="lesson-muted">
            💬 Discussions will be available soon.
          </p>
        )}

        {activeTab === "reviews" && (
          <p className="lesson-muted">
            ⭐ Reviews will be unlocked after completing the course.
          </p>
        )}
      </div>
    </div>
  );
}
