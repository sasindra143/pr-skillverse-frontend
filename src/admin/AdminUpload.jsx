import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/adminUpload.css";
import AdminVideoList from "./AdminVideoList";

/* ===============================
   COURSE ID MAP
================================ */
const courseIdMap = {
  "SAP S/4HANA Finance": "sap-s4hana-finance",
  "SAP FICO Workshop": "sap-fico-workshop",
};

/* ===============================
   YOUTUBE EMBED HELPER
================================ */
function getEmbedUrl(url) {
  if (!url) return "";

  const id = url.includes("youtu.be")
    ? url.split("/").pop()
    : new URLSearchParams(url.split("?")[1]).get("v");

  return `https://www.youtube.com/embed/${id}`;
}

export default function AdminUpload() {
  const [course, setCourse] = useState("");
  const [module, setModule] = useState("");
  const [title, setTitle] = useState("");
  const [trainer, setTrainer] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");

  /* ===============================
     HANDLE UPLOAD
  =============================== */
  const handleUpload = async () => {
    if (!course || !module || !title || !trainer || !url) {
      alert("⚠️ Please fill all required fields");
      return;
    }

    await addDoc(collection(db, "videos"), {
      courseId: courseIdMap[course],
      courseTitle: course,
      module,
      title,
      trainer,
      description: desc,
      videoUrl: getEmbedUrl(url),
      duration: Math.floor(Math.random() * 20) + 5, // mock duration
      createdAt: new Date(),
    });

    alert("✅ Video added successfully");

    // reset form
    setModule("");
    setTitle("");
    setTrainer("");
    setDesc("");
    setUrl("");
  };

  /* ===============================
     UI
  =============================== */
  return (
    <div className="admin-upload">
      <h2>Admin Video Upload</h2>

      {/* ================= UPLOAD FORM ================= */}
      <div className="admin-form">
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
          placeholder="Description (2 lines)"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          placeholder="YouTube Link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={handleUpload}>Upload Video</button>
      </div>

      {/* ================= VIDEO LIST ================= */}
      <AdminVideoList />
    </div>
  );
}
