import React, { useState, useEffect } from 'react'
import UserDashboardCard from '../../components/dashboard/UserDashboardCard'
import Title from '../../components/ui/Title';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [stats, setStats] = useState({
    activeCases: 0,
    totalCases: 0,
    todayHearings: 0,
    totalHearings: 0,
    todayMeetings: 0,
    pendingPayments: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/dashboard/user", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const dashboardData = [
    {
      title: 'Total Active Cases',
      count: stats.activeCases,
      bgColor: 'bg-info',
      icon: 'fas fa-balance-scale',
      route: '/cases'
    },
    {
      title: 'Total Cases',
      count: stats.totalCases,
      bgColor: 'bg-primary',
      icon: 'fas fa-briefcase',
      route: '/cases'
    },
    {
      title: 'Today Hearing',
      count: stats.todayHearings,
      bgColor: 'bg-success',
      icon: 'fas fa-gavel',
      route: '/hearings'
    },
    {
      title: 'Total Hearing',
      count: stats.totalHearings,
      bgColor: 'bg-secondary',
      icon: 'fas fa-gavel',
      route: '/hearings'
    },
    {
      title: 'Today Meeting',
      count: stats.todayMeetings,
      bgColor: 'bg-warning',
      icon: 'fas fa-users',
      route: '/meetings'
    },
    {
      title: 'Pending Payments',
      count: stats.pendingPayments,
      bgColor: 'bg-danger',
      icon: 'fas fa-dollar-sign',
      route: '/cases'
    }
  ];

  return (
    <div className="container-fluid">
       <Title title='Dashboard' />
      {loading ? <p>Loading stats...</p> : (
        <div className="row">
          {dashboardData.map((item, index) => (
            <UserDashboardCard
              key={index}
              title={item.title}
              count={item.count}
              bgColor={item.bgColor}
              icon={item.icon}
              onClick={() => navigate(item.route)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Index