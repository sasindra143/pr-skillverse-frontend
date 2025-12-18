import "./CourseSidebar.css";
function CourseSidebar({ videos, onSelect, activeId }) {
  return (
    <div className="sidebar">
      <h3>Course Content</h3>

      {videos.map((v) => (
        <div
          key={v.id}
          className={`lesson ${activeId === v.id ? "active" : ""}`}
          onClick={() => onSelect(v)}
        >
          ▶ {v.title}
        </div>
      ))}
    </div>
  );
}
export default CourseSidebar;

