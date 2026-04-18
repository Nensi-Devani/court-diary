import React, { useState } from "react";
import Title from "../../components/ui/Title";
import AddBtn from "../../components/buttons/AddBtn";

function Index() {
  const [meetings] = useState([
    {
      id: 1,
      title: "Client Consultation",
      date: 3,
      time: "10:00 AM",
      client: "John Doe",
    },
    {
      id: 2,
      title: "Court Preparation",
      date: 10,
      time: "02:00 PM",
      client: "Michael Smith",
    },
    {
      id: 3,
      title: "Witness Meeting",
      date: 17,
      time: "03:30 PM",
      client: "David Lee",
    },
  ]);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const getMeetings = (day) => {
    return meetings.filter((m) => m.date === day);
  };

  return (
    <div style={{ padding: 20, background: "#f3f4f6", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <Title title='Clients' />
        <AddBtn title='Client' to='/clients/create'/>
      </div>

      {/* Days Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          marginBottom: 10,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 12,
        }}
      >
        {days.map((day) => {
          const dayMeetings = getMeetings(day);

          return (
            <div
              key={day}
              style={{
                background: "#fff",
                minHeight: 120,
                borderRadius: 10,
                padding: 10,
                border: "1px solid #ddd",
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: 6 }}>{day}</div>

              {dayMeetings.map((m) => (
                <div
                  key={m.id}
                  style={{
                    background: "#4f46e5",
                    color: "white",
                    padding: "6px",
                    borderRadius: "6px",
                    marginBottom: "5px",
                    fontSize: "12px",
                  }}
                >
                  <div style={{ fontWeight: "600" }}>{m.title}</div>
                  <div>{m.time}</div>
                  <div style={{ fontSize: "10px", opacity: 0.9 }}>
                    {m.client}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Index;