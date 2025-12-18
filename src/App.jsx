import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

/* PUBLIC */
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Trainer from "./components/Trainer";
import Courses from "./components/Courses";
import Testimonials from "./components/Testimonials";
import ChooseUs from "./components/ChooseUs";
import BlogMedia from "./components/BlogMedia";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";

/* AUTH / STUDENT */
import Login from "./pages/Login";
import CoursesPage from "./pages/CoursesPage";
import VideoPage from "./pages/VideoPage";
import ProtectedRoute from "./components/ProtectedRoute";

/* ADMIN */
import AdminRoute from "./components/AdminRoute";
import AdminUpload from "./admin/AdminUpload";
import AdminLogin from "./pages/AdminLogin";

/* ================= APP LAYOUT ================= */

function AppLayout() {
  const location = useLocation();

  // Hide header on login, recordings & admin pages
  const hideHeader =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/recordings") ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        {/* ================= PUBLIC WEBSITE ================= */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Trainer />
              <Courses />
              <Testimonials />
              <ChooseUs />
              <BlogMedia />
              <Contact />
              <Footer />
              <FloatingActions />
            </>
          }
        />

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ================= STUDENT ================= */}
        <Route
          path="/recordings"
          element={
            <ProtectedRoute>
              <CoursesPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ REQUIRED (from your second snippet) */}
        <Route
          path="/recordings/:courseId"
          element={
            <ProtectedRoute>
              <VideoPage />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ================= */}
        {/* ✅ SINGLE /admin ROUTE (FIXED) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminUpload />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

/* ================= ROOT APP ================= */

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}