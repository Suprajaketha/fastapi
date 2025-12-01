import { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/users/")
      .then(() => setMessage("Welcome! API connection working."))
      .catch(() => setMessage("Unauthorized"));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
}
