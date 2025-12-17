import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CoursesPage.css";




export default function CoursesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // 🔴 Toggle this when live classes are available
  const liveClassesAvailable = true;

  const courses = [
    {
      id: "sap-s4hana-finance",
      title: "SAP S/4HANA Finance",
      modules: "24 Modules",
      duration: "120+ Hours",
      image:
        "https://res.cloudinary.com/dvknx0hpm/image/upload/v1765889427/ChatGPT_Image_Dec_16_2025_05_21_30_PM_ppwpdq.png",
    },
    {
      id: "sap-fico-workshop",
      title: "SAP FICO Workshop",
      modules: "10 Modules",
      duration: "40+ Hours",
      image:
        "https://res.cloudinary.com/dvknx0hpm/image/upload/v1765889496/ChatGPT_Image_Dec_16_2025_06_21_19_PM_odptrs.png",
    },
  ];

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="courses-page">
      {/* ================= HERO / LIVE SECTION ================= */}
      <div className="courses-hero">
  <div>
    <h2>
      {liveClassesAvailable
        ? "🔴 Live Classes Available Now"
        : "📌 Live Classes Not Available at the Moment"}
    </h2>

    <p>
      {liveClassesAvailable
        ? "Join ongoing SAP live sessions with expert trainers."
        : "Please continue with recorded classes. Live sessions will be announced soon."}
    </p>
  </div>

  {liveClassesAvailable && (
    <button>View Live Schedule</button>
  )}
</div>

      {/* ================= SEARCH ================= */}
      <div className="courses-search">
        <input
          type="text"
          placeholder="🔍 Search for course"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ================= COURSES GRID ================= */}
      <div className="courses-grid">
        {filteredCourses.map((course) => (
          <div className="course-card" key={course.id}>
            <img src={course.image} alt={course.title} />

            <div className="course-card-body">
              <h3>{course.title}</h3>

              <div className="course-meta">
                <span>📘 {course.modules}</span>
                <span>⏱ {course.duration}</span>
              </div>

              <button onClick={() => navigate(`/recordings/${course.id}`)}>
  Get Started →
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
