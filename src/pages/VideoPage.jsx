import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

import VideoPlayer from "../components/VideoPlayer";
import CourseSidebar from "../components/CourseSidebar";

import "./VideoPage.css";

export default function VideoPage() {
  const { courseId } = useParams();

  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const q = query(
          collection(db, "videos"),
          where("courseId", "==", courseId)
        );

        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setVideos(list);
        if (list.length > 0) {
          setActiveVideo(list[0]);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }

    if (courseId) {
      fetchVideos();
    }
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
