import React, { useState } from "react";
import {
  Facebook,
  Linkedin,
  Instagram,
  X,
  Youtube,
  Plus,
  XCircle,
} from "lucide-react";
import "./SocialPostPage.css";

const PLATFORMS = [
  { id: "facebook", label: "Facebook", icon: <Facebook size={18} color="#f97316" /> },
  { id: "linkedin", label: "LinkedIn", icon: <Linkedin size={18} color="#0A66C2" /> },
  { id: "instagram", label: "Instagram", icon: <Instagram size={18} color="#E1306C" /> },
  { id: "twitter", label: "Twitter (X)", icon: <X size={18} color="#000000" /> },
  { id: "youtube", label: "YouTube", icon: <Youtube size={18} color="#FF0000" /> },
];

export default function SocialPostPage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [toast, setToast] = useState("");

  // Handle platform toggle
  const togglePlatform = (id) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // File upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Remove file
  const removeFile = () => {
    setFile(null);
  };

  // Handle post action
  const handlePost = () => {
    if (!caption && !file) {
      setToast("⚠️ Please add a caption or media before posting.");
      return;
    }
    setToast(
      `✅ Post ${
        isScheduled ? "scheduled" : "shared"
      } to ${selectedPlatforms.join(", ")}!`
    );
    setCaption("");
    setFile(null);
    setSelectedPlatforms([]);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div className="page">
      <div className="card">
        <h1>📢 Social Media Post</h1>
        <div className="content-grid">
          {/* Left Column */}
          <div className="left-column">
            <div className="section">
              <label>Select Platforms</label>
              <div className="chips">
                {selectedPlatforms.map((id) => {
                  const platform = PLATFORMS.find((p) => p.id === id);
                  return (
                    <div className="chip" key={id}>
                      {platform.icon} {platform.label}
                      <span
                        className="chip-close"
                        onClick={() => togglePlatform(id)}
                      >
                        ×
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="platform-options">
                {PLATFORMS.map((p) => (
                  <label key={p.id}>
                    <input
                      type="checkbox"
                      checked={selectedPlatforms.includes(p.id)}
                      onChange={() => togglePlatform(p.id)}
                    />
                    {p.icon} {p.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Toggle scheduled / instant */}
            <div className="section">
              <label>Post Mode</label>
              <div
                className="toggle-switch"
                onClick={() => setIsScheduled(!isScheduled)}
              >
                <span className={!isScheduled ? "active" : ""}>Instant</span>
                <span className={isScheduled ? "active" : ""}>Scheduled</span>
              </div>
            </div>

            {/* Caption */}
            <div className="section">
              <label>Caption</label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write something awesome..."
              />
            </div>

            <button className="post-btn" onClick={handlePost}>
              {isScheduled ? "Schedule Post" : "Post Now"}
            </button>
          </div>

          {/* Right Column */}
          <div className="right-column">
            <div className="section">
              <label>Upload Media</label>
              <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
              {file && (
                <div className="preview">
                  {file.type.startsWith("image") ? (
                    <img src={URL.createObjectURL(file)} alt="preview" />
                  ) : (
                    <video src={URL.createObjectURL(file)} controls />
                  )}
                  <button className="remove-btn" onClick={removeFile}>
                    <XCircle size={16} /> Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="toast-container">
          <div className="toast">{toast}</div>
        </div>
      )}
    </div>
  );
}
