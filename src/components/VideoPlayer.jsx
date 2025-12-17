import "./VideoPlayer.css";

export default function VideoPlayer({ video }) {
  if (!video) {
    return <div className="video-placeholder">Select a lesson to start</div>;
  }

  return (
    <>
      <div className="video-wrapper">
        <iframe
          src={`${video.videoUrl}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="lesson-info">
        <h2>{video.title}</h2>
        <p><b>Trainer:</b> {video.trainer}</p>
        <p className="desc">{video.description}</p>
      </div>
    </>
  );
}
