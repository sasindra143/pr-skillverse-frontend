import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import "./AdminUpload.css";

const courseIdMap = {
  "SAP S/4HANA Finance": "sap-s4hana-finance",
  "SAP FICO Workshop": "sap-fico-workshop",
};

function getEmbedUrl(url) {
  if (url.includes("youtu.be")) {
    return `https://www.youtube.com/embed/${url.split("/").pop()}`;
  }
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export default function AdminUpload() {
  const [course, setCourse] = useState("");
  const [module, setModule] = useState("");
  const [title, setTitle] = useState("");
  const [trainer, setTrainer] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videos, setVideos] = useState([]);

  /* 🔄 Live fetch all videos */
  useEffect(() => {
    const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setVideos(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });
    return () => unsub();
  }, []);

  async function handleUpload() {
    if (!course || !module || !title || !videoUrl) {
      alert("Fill all required fields");
      return;
    }

    await addDoc(collection(db, "videos"), {
      courseId: courseIdMap[course],
      courseTitle: course,
      module,
      title,
      trainer,
      description,
      videoUrl: getEmbedUrl(videoUrl),
      createdAt: new Date(),
    });

    alert("Video uploaded successfully");

    setModule("");
    setTitle("");
    setTrainer("");
    setDescription("");
    setVideoUrl("");
  }

  async function handleDelete(id) {
    if (window.confirm("Delete this video?")) {
      await deleteDoc(doc(db, "videos", id));
    }
  }

  /* 🔹 Separate lists */
  const financeVideos = videos.filter(
    (v) => v.courseId === "sap-s4hana-finance"
  );

  const ficoVideos = videos.filter(
    (v) => v.courseId === "sap-fico-workshop"
  );

  return (
    <div className="admin-page">
      {/* 🔼 UPLOAD FORM */}
      <div className="admin-upload-card">
        <h2>🎬 Admin Video Upload</h2>

        <select value={course} onChange={(e) => setCourse(e.target.value)}>
          <option value="">Select Course</option>
          {Object.keys(courseIdMap).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          placeholder="Module Name"
          value={module}
          onChange={(e) => setModule(e.target.value)}
        />

        <input
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Trainer Name"
          value={trainer}
          onChange={(e) => setTrainer(e.target.value)}
        />

        <textarea
          placeholder="Lesson Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="YouTube URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />

        <button onClick={handleUpload}>Upload Video</button>
      </div>

      {/* 📋 VIDEO LISTS */}
      <div className="video-lists-container">
        {/* SAP FINANCE */}
        <div className="admin-video-list">
          <h3>📘 SAP S/4HANA Finance</h3>

          {financeVideos.length === 0 && <p>No videos uploaded</p>}

          {financeVideos.map((v) => (
            <div key={v.id} className="video-row">
              <div>
                <strong>{v.title}</strong>
                <p>{v.module}</p>
                <small>{v.createdAt?.toDate().toLocaleString()}</small>
              </div>
              <button onClick={() => handleDelete(v.id)}>Delete</button>
            </div>
          ))}
        </div>

        {/* SAP FICO */}
        <div className="admin-video-list">
          <h3>📕 SAP FICO Workshop</h3>

          {ficoVideos.length === 0 && <p>No videos uploaded</p>}

          {ficoVideos.map((v) => (
            <div key={v.id} className="video-row">
              <div>
                <strong>{v.title}</strong>
                <p>{v.module}</p>
                <small>{v.createdAt?.toDate().toLocaleString()}</small>
              </div>
              <button onClick={() => handleDelete(v.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
