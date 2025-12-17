import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
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

  async function handleUpload() {
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

    alert("Video added successfully");
  }

  return (
    <div className="admin-upload">
      <h2>Admin Video Upload</h2>

      <select onChange={e => setCourse(e.target.value)}>
        <option>Select Course</option>
        {Object.keys(courseIdMap).map(c => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <input placeholder="Module Name" onChange={e => setModule(e.target.value)} />
      <input placeholder="Lesson Title" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Trainer Name" onChange={e => setTrainer(e.target.value)} />
      <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <input placeholder="YouTube URL" onChange={e => setVideoUrl(e.target.value)} />

      <button onClick={handleUpload}>Upload Video</button>
    </div>
  );
}
