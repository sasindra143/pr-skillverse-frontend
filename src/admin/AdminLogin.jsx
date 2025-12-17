import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../admin/admin.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const loginAdmin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const auth = getAuth();
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCred.user.getIdTokenResult();

    if (token.claims.admin) {
      navigate("/admin/upload");
    } else {
      alert("Not an admin");
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={loginAdmin} className="admin-card">
        <h2>Admin Login</h2>
        <input name="email" placeholder="Admin Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button>Login</button>
      </form>
    </div>
  );
}
