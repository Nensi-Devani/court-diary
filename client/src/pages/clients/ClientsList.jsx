import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdSearch } from "react-icons/md";

export default function ClientsList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/clients", {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page }
      });
      setClients(res.data.data);
      setTotalPages(res.data.pagination.pages);
    } catch (err) {
      toast.error("Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchClients();
  };

  return (
    <div>
      <div className="header-actions">
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700" }}>Clients</h2>
        <button className="btn btn-primary">Add New Client</button>
      </div>

      <div className="card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
        <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "0.5rem" }}>
          <div className="input-group" style={{ marginBottom: 0, flex: 1 }}>
            <input 
              type="text" 
              placeholder="Search clients..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: "0 1rem" }}>
            <MdSearch size={20} />
          </button>
        </form>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ textAlign: "center", padding: "2rem" }}>Loading...</td></tr>
            ) : clients.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: "center", padding: "2rem" }}>No clients found.</td></tr>
            ) : (
              clients.map((client) => (
                <tr key={client._id}>
                  <td style={{ fontWeight: "500", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <img 
                      src={client.avatar || `https://ui-avatars.com/api/?name=${client.name}&background=random`} 
                      alt={client.name} 
                      style={{ width: "32px", height: "32px", borderRadius: "50%" }}
                    />
                    {client.name}
                  </td>
                  <td>{client.phone || "N/A"}</td>
                  <td>{client.address || "N/A"}</td>
                  <td>{new Date(client.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-outline" style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}>View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
          <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
            Page {page} of {totalPages || 1}
          </span>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button 
              className="btn btn-outline" 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
