import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // LOGIN
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/recordings");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // FORGOT PASSWORD
  const forgotPassword = async () => {
    if (!email) {
      alert("Enter email to reset password");
      return;
    }
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent");
  };

  return (
    <div className="login-wrapper">
      {/* Close Button */}
      <button className="close-btn" onClick={() => navigate("/")}>×</button>

      <div className="login-card">
        <h2>Student Login</h2>
        <p>Access recorded SAP training</p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Signing In..." : "Login"}
        </button>

        <p className="forgot" onClick={forgotPassword}>
          🔑 Forgot Password?
        </p>
      </div>
    </div>
  );
}
