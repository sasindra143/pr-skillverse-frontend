import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import "./AdminVideoList.css";

export default function AdminVideoList() {
  const [videos, setVideos] = useState([]);

  async function fetchVideos() {
    const snap = await getDocs(collection(db, "videos"));
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    setVideos(list);
  }

  async function handleDelete(id) {
    const confirm = window.confirm("Delete this video permanently?");
    if (!confirm) return;

    await deleteDoc(doc(db, "videos", id));
    fetchVideos();
  }

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="admin-video-list">
      <h2>Uploaded Videos</h2>

      {videos.length === 0 && <p>No videos uploaded yet</p>}

      {videos.map(video => (
        <div className="video-row" key={video.id}>
          <div>
            <h4>{video.title}</h4>
            <p>{video.courseTitle} • {video.module}</p>
          </div>

          <button
            className="delete-btn"
            onClick={() => handleDelete(video.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
