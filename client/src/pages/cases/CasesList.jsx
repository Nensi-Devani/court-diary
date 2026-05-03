import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdSearch, MdFilterList } from "react-icons/md";

export default function CasesList() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("dateDesc");

  const fetchCases = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/cases", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          search,
          status: statusFilter,
          page,
          sort
        }
      });
      setCases(res.data.data);
      setTotalPages(res.data.pagination.pages);
    } catch (err) {
      toast.error("Failed to load cases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, [page, statusFilter, sort]); // Fetch when these change. For search, we might use a debounce or explicit button.

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCases();
  };

  return (
    <div>
      <div className="header-actions">
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700" }}>Cases</h2>
        <button className="btn btn-primary">Add New Case</button>
      </div>

      <div className="card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
        <div className="search-filter">
          <form onSubmit={handleSearchSubmit} style={{ flex: 1, display: "flex", gap: "0.5rem" }}>
            <div className="input-group" style={{ marginBottom: 0, flex: 1 }}>
              <input 
                type="text" 
                placeholder="Search cases..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: "0 1rem" }}>
              <MdSearch size={20} />
            </button>
          </form>

          <div className="input-group" style={{ marginBottom: 0, width: "150px" }}>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Reopened">Reopened</option>
            </select>
          </div>

          <div className="input-group" style={{ marginBottom: 0, width: "150px" }}>
            <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
              <option value="dateDesc">Newest First</option>
              <option value="dateAsc">Oldest First</option>
              <option value="nameAsc">Title A-Z</option>
              <option value="nameDesc">Title Z-A</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Case No.</th>
              <th>Title</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ textAlign: "center", padding: "2rem" }}>Loading...</td></tr>
            ) : cases.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: "center", padding: "2rem" }}>No cases found.</td></tr>
            ) : (
              cases.map((c) => (
                <tr key={c._id}>
                  <td style={{ fontWeight: "500" }}>{c.caseNo}</td>
                  <td>{c.title}</td>
                  <td>
                    <span className={`status-badge ${c.status === 'Active' ? 'status-done' : 'status-pending'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-outline" style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}>View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        {/* Pagination Controls */}
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
