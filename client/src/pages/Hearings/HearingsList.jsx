import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdSearch } from "react-icons/md";

export default function HearingsList() {
  const [hearings, setHearings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const fetchHearings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/hearings", {
        headers: { Authorization: `Bearer ${token}` },
        params: { 
            page, 
            status: statusFilter,
            startDate: dateRange.start,
            endDate: dateRange.end
        }
      });
      setHearings(res.data.data);
      setTotalPages(res.data.pagination.pages);
    } catch (err) {
      toast.error("Failed to load hearings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHearings();
  }, [page, statusFilter, dateRange]);

  return (
    <div>
      <div className="header-actions" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700" }}>Hearings</h2>
        
        <div style={{ display: 'flex', gap: '0.5rem', flex: 1, minWidth: '300px' }}>
            <select 
                className="form-control" 
                style={{ width: '150px' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="">All Statuses</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
            </select>

            <input 
                type="date" 
                className="form-control" 
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            />
            <input 
                type="date" 
                className="form-control" 
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            />
        </div>

        <button className="btn btn-primary">Schedule Hearing</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Case No.</th>
              <th>Status</th>
              <th>Fee Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ textAlign: "center", padding: "2rem" }}>Loading...</td></tr>
            ) : hearings.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: "center", padding: "2rem" }}>No hearings found.</td></tr>
            ) : (
              hearings.map((h) => (
                <tr key={h._id}>
                  <td style={{ fontWeight: "500" }}>{new Date(h.hearingDate).toLocaleDateString()}</td>
                  <td>{h.caseId?.caseNo || 'Unknown'}</td>
                  <td>
                    <span className="status-badge status-pending">{h.status}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${h.payment?.status === 'paid' ? 'status-done' : 'status-urgent'}`}>
                      {h.payment?.status || 'unpaid'}
                    </span>
                  </td>
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
