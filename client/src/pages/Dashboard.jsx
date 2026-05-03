export default function Dashboard() {
  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>Overview</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
        
        <div className="card" style={{ padding: "1.5rem" }}>
          <h3 style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Total Active Cases</h3>
          <p style={{ fontSize: "2rem", fontWeight: "700" }}>24</p>
        </div>

        <div className="card" style={{ padding: "1.5rem" }}>
          <h3 style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Upcoming Hearings</h3>
          <p style={{ fontSize: "2rem", fontWeight: "700", color: "var(--primary)" }}>5</p>
        </div>

        <div className="card" style={{ padding: "1.5rem" }}>
          <h3 style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Total Clients</h3>
          <p style={{ fontSize: "2rem", fontWeight: "700" }}>38</p>
        </div>

      </div>
    </div>
  );
}
