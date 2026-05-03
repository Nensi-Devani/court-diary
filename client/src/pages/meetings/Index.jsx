import React, { useState, useEffect } from "react";
import Title from "../../components/ui/Title";
import AddBtn from "../../components/buttons/AddBtn";
import axios from "axios";
import { format } from "date-fns";
import { MdEventNote } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./meetings.css";

export default function Index() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const startDate = new Date(Date.UTC(selectedYear, selectedMonth, 1));
      const endDate = new Date(Date.UTC(selectedYear, selectedMonth + 1, 0, 23, 59, 59, 999));

      const res = await axios.get("http://localhost:5000/api/meetings", {
        headers: { Authorization: `Bearer ${token}` },
        params: { 
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      });
      setMeetings(res.data.data);
    } catch (err) {
      toast.error("Failed to load meetings");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete meeting: ${title}?`)) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/meetings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Meeting deleted successfully");
      fetchMeetings();
    } catch (err) {
      toast.error("Failed to delete meeting");
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [selectedYear, selectedMonth]);

  const groupMeetingsByDate = (meetingList) => {
    const grouped = {};
    // Sort meetings chronologically
    const sorted = [...meetingList].sort((a, b) => new Date(a.startDatetime) - new Date(b.startDatetime));
    
    sorted.forEach(m => {
      const dateKey = format(new Date(m.startDatetime), "EEEE, MMM d, yyyy");
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(m);
    });
    return grouped;
  };

  const dateGrouped = groupMeetingsByDate(meetings);

  return (
    <div className="meetings-page">
      <div className="meetings-header">
        <Title title='Meetings' />
        
        <div className="meetings-filters">
          <select 
            className="form-control filter-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {months.map((m, i) => (
              <option key={m} value={i}>{m}</option>
            ))}
          </select>

          <select 
            className="form-control filter-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <AddBtn title='Meeting' to='/meetings/create'/>
        </div>
      </div>

      <div className="meetings-content">
        {loading ? (
          <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : Object.keys(dateGrouped).length === 0 ? (
          <div className="empty-state">
            <MdEventNote size={64} color="var(--text-muted)" />
            <h3>No meetings scheduled</h3>
            <p>Try selecting a different month or add a new meeting.</p>
          </div>
        ) : (
          <div className="date-wise-timeline">
            {Object.keys(dateGrouped).map((date) => (
              <div key={date} className="date-group">
                <div className="date-header">
                  <div className="date-pill">{date}</div>
                  <div className="date-line"></div>
                </div>
                
                <div className="date-meetings">
                  {dateGrouped[date].map((meeting) => {
                    let statusClass = "status-notes";
                    if (meeting.status === "upcoming") statusClass = "status-pending";
                    if (meeting.status === "completed") statusClass = "status-done";
                    if (meeting.status === "cancelled") statusClass = "status-urgent";

                    return (
                      <div key={meeting._id} className="meeting-row-card animate-fade-in">
                        <div className="meeting-time">
                          <span className="start-time">{format(new Date(meeting.startDatetime), "h:mm a")}</span>
                          <span className="time-divider"></span>
                          <span className="end-time">{format(new Date(meeting.endDatetime), "h:mm a")}</span>
                        </div>
                        
                        <div className="meeting-main">
                          <div className="meeting-info">
                            <h4 className="meeting-title">{meeting.title}</h4>
                            <p className="meeting-desc">{meeting.description || "No description provided."}</p>
                          </div>
                          
                          <div className="meeting-meta-actions">
                            <div className={`status-badge ${statusClass}`}>
                              {meeting.status.toUpperCase()}
                            </div>
                            <div className="d-flex gap-2">
                              <Link to={`/meetings/edit/${meeting._id}`} className="icon-btn text-primary"><FaEdit size={18} /></Link>
                              <button 
                                className="icon-btn text-danger" 
                                onClick={() => handleDelete(meeting._id, meeting.title)}
                              >
                                <FaTrash size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}