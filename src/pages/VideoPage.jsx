import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

import VideoPlayer from "../components/VideoPlayer";
import { CourseSidebar } from "../components/CourseSidebar";

import "./VideoPage.css";
export default function VideoPage() {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      const q = query(
        collection(db, "videos"),
        where("courseId", "==", courseId)
      );

      const snap = await getDocs(q);
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));

      setVideos(list);
      setActiveVideo(list[0]);
    }

    fetchVideos();
  }, [courseId]);

  return (
    <div className="video-page">
      <div className="left">
        <VideoPlayer video={activeVideo} />
      </div>

      <div className="right">
        <CourseSidebar
          videos={videos}
          activeId={activeVideo?.id}
          onSelect={setActiveVideo}
        />
      </div>
    </div>
  );
}
