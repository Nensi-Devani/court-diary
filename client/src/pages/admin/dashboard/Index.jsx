import React, { useState, useEffect } from 'react'
import AdminDashboardCard from '../../../components/dashboard/AdminDashboardCard'
import Title from '../../../components/ui/Title'
import axios from 'axios'

const Index = () => {
  const [stats, setStats] = useState({
    totalLawyers: 0,
    totalCases: 0,
    totalClients: 0,
    activeCases: 0,
    todayHearings: 0,
    todayMeetings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/dashboard/admin", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data.data);
      } catch (err) {
        console.error("Failed to fetch admin stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const dashboardData = [
    {
      title: 'Total Lawyers',
      value: stats.totalLawyers,
      icon: 'fas fa-user-graduate',
      bgColor: 'bg-info',
    },
    {
      title: 'Total Cases',
      value: stats.totalCases,
      icon: 'fas fa-file',
      bgColor: 'bg-danger',
    },
    {
      title: 'Active Cases',
      value: stats.activeCases || 0,
      icon: 'fas fa-check',
      bgColor: 'bg-success',
    },
    {
      title: 'Today Hearing',
      value: stats.todayHearings || 0,
      icon: 'fas fa-gavel',
      bgColor: 'bg-secondary',
    },
    {
      title: 'Today Meetings',
      value: stats.todayMeetings || 0,
      icon: 'fas fa-calendar',
      bgColor: 'bg-primary',
    },
    {
      title: 'Total Clients',
      value: stats.totalClients,
      icon: 'fas fa-users',
      bgColor: 'bg-warning',
    }
  ]

  return (
    <div className="container-fluid">

       <Title title='Dashboard' />

      {loading ? <p>Loading stats...</p> : (
        <div className="row">
          {dashboardData.map((item, index) => (
            <AdminDashboardCard
              key={index}
              title={item.title}
              value={item.value}
              icon={item.icon}
              bgColor={item.bgColor}
            />
          ))}
        </div>
      )}

      {/* <div className="col-md-12">
        <CasesIndex />
      </div> */}

    </div>
  )
}

export default Index