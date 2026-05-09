import { useState, useEffect } from "react";
import { Log } from "./logger";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJoYW5lZXNodGFkZXBhbGxpQGdtYWlsLmNvbSIsImV4cCI6MTc3ODMwODE3NywiaWF0IjoxNzc4MzA3Mjc3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMDlhMzYwNzEtZWEzZi00Y2VkLTg1ZjMtMGI5MWZkZDkwNGY0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidGFkZXBhbGxpIGhhbmVlc2giLCJzdWIiOiI5NTcwNzU0OC1jZDVlLTRhNWMtOGQzYy0yY2Q2N2E0MTIxOGYifSwiZW1haWwiOiJoYW5lZXNodGFkZXBhbGxpQGdtYWlsLmNvbSIsIm5hbWUiOiJ0YWRlcGFsbGkgaGFuZWVzaCIsInJvbGxObyI6IjIzNDgxYTYwYTciLCJhY2Nlc3NDb2RlIjoiZUpkQ3VDIiwiY2xpZW50SUQiOiI5NTcwNzU0OC1jZDVlLTRhNWMtOGQzYy0yY2Q2N2E0MTIxOGYiLCJjbGllbnRTZWNyZXQiOiJlRmJTeHRmelJId2RyR1loIn0.eyThO2Y84M3TiSTy7eKDgUc3IMG1HMYGJItUVVNpfRU"
const API = "http://localhost:5000/notifications";

const PRIORITY = { Placement: 3, Result: 2, Event: 1 };

function getPriority(type) {
  return PRIORITY[type] || 0;
}

function App() {
  const [notifications, setNotifications] = useState([]);
  const [viewed, setViewed] = useState([]);
  const [filter, setFilter] = useState("All");
  const [topN, setTopN] = useState(10);

  useEffect(() => {
    fetch(API, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    })
      .then(res => res.json())
      .then(data => {
        const sorted = [...data.notifications].sort((a, b) => {
          const pd = getPriority(b.Type) - getPriority(a.Type);
          if (pd !== 0) return pd;
          return new Date(b.Timestamp) - new Date(a.Timestamp);
        });
        setNotifications(sorted);
        Log("frontend", "info", "component", "Notifications fetched and sorted");
      })
      .catch(err => {
        Log("frontend", "error", "api", "Failed to fetch notifications");
      });
  }, []);

  const filtered = filter === "All"
    ? notifications
    : notifications.filter(n => n.Type === filter);

  const priority = filtered.slice(0, topN);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1>Campus Notifications</h1>

      <div style={{ marginBottom: 16 }}>
        <label>Filter: </label>
        {["All", "Placement", "Result", "Event"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ marginRight: 8, background: filter === f ? "#1976d2" : "#eee", color: filter === f ? "#fff" : "#000", padding: "6px 14px", border: "none", borderRadius: 4, cursor: "pointer" }}>
            {f}
          </button>
        ))}
        <label style={{ marginLeft: 16 }}>Top N: </label>
        <input type="number" value={topN} onChange={e => setTopN(Number(e.target.value))}
          style={{ width: 60, marginLeft: 8, padding: 4 }} />
      </div>

      <h2>Priority Inbox (Top {topN})</h2>
      {priority.map(n => (
        <div key={n.ID} onClick={() => setViewed(v => [...v, n.ID])}
          style={{ background: viewed.includes(n.ID) ? "#f5f5f5" : "#e3f2fd", border: "1px solid #90caf9", borderRadius: 8, padding: 12, marginBottom: 8, cursor: "pointer" }}>
          <strong>{n.Type}</strong> — {n.Message}
          <div style={{ fontSize: 12, color: "#666" }}>{n.Timestamp}</div>
          {viewed.includes(n.ID) && <span style={{ fontSize: 11, color: "#999" }}>✓ Viewed</span>}
        </div>
      ))}

      <h2>All Notifications</h2>
      {filtered.map(n => (
        <div key={n.ID}
          style={{ background: viewed.includes(n.ID) ? "#f5f5f5" : "#fff", border: "1px solid #ddd", borderRadius: 8, padding: 12, marginBottom: 8 }}>
          <strong>{n.Type}</strong> — {n.Message}
          <div style={{ fontSize: 12, color: "#666" }}>{n.Timestamp}</div>
        </div>
      ))}
    </div>
  );
}

export default App;