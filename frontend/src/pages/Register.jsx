import { useState } from "react";
import api from "../api/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", { email, password });
      alert("Account created. Please log in.");
      window.location.href = "/login";
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
