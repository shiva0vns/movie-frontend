import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { register } from "../service/authApi";


function Register(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { loginUser } = useAuth()
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
    
        try {
          const authResponse = await register(name, email, password);
          loginUser(authResponse);
          navigate("/");
        } catch (err) {
          console.log(err);
          setError(err.message || "Registration failed");
        } finally {
          setLoading(false);
        }
      };
      
      return (
        <div className="login">
          <form className="login-form" onSubmit={onSubmit}>
            <h2>Register</h2>
    
            {error && <div className="error-message">{error}</div>}
    
            <input
              type="text"
              className="login-input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
    
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </button>
    
            <p className="login-switch">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      );

    
  
  
}

export default Register