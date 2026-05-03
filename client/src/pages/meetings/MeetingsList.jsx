import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { MdChatBubbleOutline, MdVisibility, MdMoreHoriz } from "react-icons/md";

export default function MeetingsList() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/meetings", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMeetings(res.data.data);
    } catch (err) {
      toast.error("Failed to load meetings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  // Group by status
  const groupedByStatus = {
    upcoming: meetings.filter(m => m.status === 'upcoming'),
    completed: meetings.filter(m => m.status === 'completed'),
    cancelled: meetings.filter(m => m.status === 'cancelled')
  };

  // Helper to group meetings by date within a status
  const groupMeetingsByDate = (meetingList) => {
    const grouped = {};
    meetingList.forEach(m => {
      const dateKey = format(new Date(m.startDatetime), "MMM d, yyyy");
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(m);
    });
    return grouped;
  };

  const columns = [
    {
      id: 'upcoming',
      title: 'Upcoming Meetings',
      subtitle: 'Scheduled events',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    },
    {
      id: 'completed',
      title: 'Completed',
      subtitle: 'Past meetings',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    },
    {
      id: 'cancelled',
      title: 'Cancelled',
      subtitle: 'Did not happen',
      avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    }
  ];

  return (
    <div>
      <div className="header-actions">
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700" }}>Meetings</h2>
        <button className="btn btn-primary">Schedule Meeting</button>
      </div>

      <div className="meetings-board">
        {columns.map(col => {
          const dateGrouped = groupMeetingsByDate(groupedByStatus[col.id] || []);
          
          return (
            <div key={col.id} className="meetings-column">
              <div className="column-header">
                <div className="column-title">
                  <img src={col.avatar} alt="Column Icon" className="column-icon" />
                  <div className="column-title-text">
                    {col.title}
                    <span className="column-subtitle">{col.subtitle}</span>
                  </div>
                </div>
                <button className="more-btn"><MdMoreHoriz size={20} /></button>
              </div>

              <div className="timeline-container">
                {Object.keys(dateGrouped).length === 0 && (
                  <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>No meetings</p>
                )}
                
                {Object.keys(dateGrouped).map((date, index) => (
                  <div key={date} className="timeline-date-group">
                    <div className="timeline-date">
                      Meetings on {date}
                    </div>
                    
                    {dateGrouped[date].map((meeting, mIndex) => {
                      // Status colors mapping similar to image
                      let statusClass = "status-notes";
                      if (meeting.status === "upcoming") statusClass = "status-pending";
                      if (meeting.status === "completed") statusClass = "status-done";
                      if (meeting.status === "cancelled") statusClass = "status-urgent";

                      // Randomize avatar just for design matching, or we could use meeting creator
                      const avatarUrl = `https://i.pravatar.cc/150?u=${meeting._id}`;

                      return (
                        <div key={meeting._id} style={{ position: "relative" }}>
                          {/* Avatar placed ON the timeline line */}
                          <div style={{
                            position: "absolute",
                            left: "-2.25rem", // Position perfectly on the line
                            top: "1.2rem",
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            zIndex: 3,
                            border: "2px solid #fff",
                            backgroundColor: "#fff"
                          }}>
                            <img src={avatarUrl} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          
                          <div className="meeting-card">
                            <div className="meeting-title">{meeting.title}</div>
                            <div className="meeting-meta">
                              {format(new Date(meeting.startDatetime), "h:mm a")} - {format(new Date(meeting.endDatetime), "h:mm a")}
                            </div>
                            
                            <div className="meeting-footer">
                              <div className="meeting-actions">
                                <div className="action-item">
                                  <MdChatBubbleOutline size={14} />
                                  <span>{Math.floor(Math.random() * 5)}</span>
                                </div>
                                <div className="action-item">
                                  <MdVisibility size={14} />
                                  <span>{Math.floor(Math.random() * 100) + 10}</span>
                                </div>
                                <div className="action-item">
                                  <MdMoreHoriz size={14} />
                                </div>
                              </div>
                              <div className={`status-badge ${statusClass}`}>
                                {meeting.status.toUpperCase()}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
