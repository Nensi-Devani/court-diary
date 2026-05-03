import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  MdDashboard, 
  MdGavel, 
  MdEventNote, 
  MdPeople, 
  MdOutlineMeetingRoom,
  MdLogout,
  MdNotifications
} from "react-icons/md";

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const role = localStorage.getItem("userRole");
  const userName = localStorage.getItem("userName") || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const navItems = role === 'admin' ? [
    { name: "Dashboard", path: "/admin", icon: <MdDashboard size={20} /> },
    { name: "Lawyers", path: "/admin/lawyers", icon: <MdPeople size={20} /> },
    { name: "Cases", path: "/cases", icon: <MdGavel size={20} /> },
    { name: "Meetings", path: "/meetings", icon: <MdOutlineMeetingRoom size={20} /> },
  ] : [
    { name: "Dashboard", path: "/", icon: <MdDashboard size={20} /> },
    { name: "Cases", path: "/cases", icon: <MdGavel size={20} /> },
    { name: "Hearings", path: "/hearings", icon: <MdEventNote size={20} /> },
    { name: "Clients", path: "/clients", icon: <MdPeople size={20} /> },
    { name: "Meetings", path: "/meetings", icon: <MdOutlineMeetingRoom size={20} /> },
  ];

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div style={{ padding: "2rem 1.5rem", borderBottom: "1px solid var(--border-color)" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--primary)" }}>CourtDiary</h1>
        </div>
        <nav style={{ padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== "/" && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.name}
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: isActive ? "var(--primary-light)" : "transparent",
                  color: isActive ? "var(--primary-dark)" : "var(--text-main)",
                  fontWeight: isActive ? "600" : "500",
                }}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div style={{ padding: "1.5rem 1rem", borderTop: "1px solid var(--border-color)" }}>
          <button 
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 1rem",
              width: "100%",
              color: "var(--danger)",
              fontWeight: "500"
            }}
          >
            <MdLogout size={20} />
            Log Out
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div style={{ fontWeight: "600", fontSize: "1.125rem" }}>
            {navItems.find(i => location.pathname === i.path || (i.path !== "/" && location.pathname.startsWith(i.path)))?.name || "Dashboard"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button style={{ position: "relative", color: "var(--text-muted)" }}>
              <MdNotifications size={24} />
              <span style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "8px",
                height: "8px",
                backgroundColor: "var(--danger)",
                borderRadius: "50%"
              }}></span>
            </button>
            <div style={{ 
              width: "36px", 
              height: "36px", 
              borderRadius: "50%", 
              backgroundColor: "var(--primary)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
              fontSize: "0.875rem"
            }}>
              {userName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
            </div>
          </div>
        </header>
        <div className="page-content animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
