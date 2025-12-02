import { useState } from "react";
import api from "./api/api";

export default function App() {

  // ---------------------------------------
  // REGISTER
  // ---------------------------------------
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // ---------------------------------------
  // LOGIN
  // ---------------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ---------------------------------------
  // RESULTS
  // ---------------------------------------
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [healthStatus, setHealthStatus] = useState("");

  // ---------------------------------------
  // REGISTER HANDLER
  // ---------------------------------------
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", {
        email: regEmail,
        password: regPassword,
      });
      alert("Registration successful");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  // ---------------------------------------
  // LOGIN HANDLER
  // ---------------------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful");
    } catch (err) {
      console.error(err);
      alert("Invalid login credentials");
    }
  };

  // ---------------------------------------
  // FETCH USERS
  // ---------------------------------------
  const loadUsers = async () => {
    try {
      const res = await api.get("/users/");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load users");
    }
  };

  // ---------------------------------------
  // FETCH TASKS
  // ---------------------------------------
  const loadTasks = async () => {
    try {
      const res = await api.get("/tasks/");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load tasks");
    }
  };

  // ---------------------------------------
  // HEALTH CHECK
  // ---------------------------------------
  const checkHealth = async () => {
    try {
      const res = await api.get("/health");
      setHealthStatus(res.data.status);
    } catch (err) {
      console.error(err);
      alert("Health check failed");
    }
  };

  return (
    <div style={{ padding: 30 }}>

      {/* ------------------------------------ */}
      {/* REGISTER */}
      {/* ------------------------------------ */}
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="email"
          placeholder="Email"
          value={regEmail}
          onChange={(e) => setRegEmail(e.target.value)}
        /><br/><br/>

        <input 
          type="password"
          placeholder="Password"
          value={regPassword}
          onChange={(e) => setRegPassword(e.target.value)}
        /><br/><br/>

        <button type="submit">Register</button>
      </form>

      <hr/>

      {/* ------------------------------------ */}
      {/* LOGIN */}
      {/* ------------------------------------ */}
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/><br/>

        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/><br/>

        <button type="submit">Login</button>
      </form>

      <hr/>

      {/* ------------------------------------ */}
      {/* USERS */}
      {/* ------------------------------------ */}
      <h2>Users</h2>
      <button onClick={loadUsers}>Load Users</button>

      <ul>
        {users.map((u, index) => (
          <li key={index}>{u.email}</li>
        ))}
      </ul>

      <hr/>

      {/* ------------------------------------ */}
      {/* TASKS */}
      {/* ------------------------------------ */}
      <h2>Tasks</h2>
      <button onClick={loadTasks}>Load Tasks</button>

      <ul>
        {tasks.map((t, index) => (
          <li key={index}>{t.title}</li>
        ))}
      </ul>

      <hr/>

      {/* ------------------------------------ */}
      {/* HEALTH */}
      {/* ------------------------------------ */}
      <h2>Health</h2>
      <button onClick={checkHealth}>Check Server Health</button>

      <p>Status: {healthStatus}</p>

      <hr/>

    </div>
  );
}
