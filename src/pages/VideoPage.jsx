import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/videoPage.css";

export default function VideoPage() {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const load = async () => {
      const q = query(
        collection(db, "videos"),
        where("courseId", "==", courseId)
      );
      const snap = await getDocs(q);
      const data = snap.docs.map(d => d.data());
      setVideos(data);
      setActive(data[0]);
    };
    load();
  }, [courseId]);

  if (!active) return <p>No videos uploaded yet.</p>;

  const modules = [...new Set(videos.map(v => v.module))];

  return (
    <div className="video-layout">
      {/* LEFT */}
      <div className="video-left">
        <iframe src={active.videoUrl} allowFullScreen />
        <h2>{active.title}</h2>
        <p><b>Trainer:</b> {active.trainer}</p>
        <p>{active.description}</p>
      </div>

      {/* RIGHT */}
      <div className="video-right">
        <h3>Course Content</h3>
        {modules.map(m => (
          <div key={m} className="module">
            <h4>{m}</h4>
            {videos.filter(v => v.module === m).map(v => (
              <div
                key={v.title}
                className={`lesson ${v.title === active.title ? "active" : ""}`}
                onClick={() => setActive(v)}
              >
                ▶ {v.title} ({v.duration} min)
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
