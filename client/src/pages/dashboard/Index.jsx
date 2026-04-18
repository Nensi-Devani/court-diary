import React from 'react'
import UserDashboardCard from '../../components/dashboard/UserDashboardCard'
import Title from '../../components/ui/Title';
import CasesIndex from '../cases/Index'

const Index = () => {

  const dashboardData = [
    {
      title: 'Total Active Case',
      count: 150,
      bgColor: 'bg-info',
      icon: 'fas fa-balance-scale',
      route: '/cases'
    },
    {
      title: 'Today Hearing',
      count: 53,
      bgColor: 'bg-success',
      icon: 'fas fa-gavel',
      route: '/hearings'
    },
    {
      title: 'Today Meeting',
      count: 44,
      bgColor: 'bg-warning',
      icon: 'fas fa-users',
      route: '/meetings'
    },
    {
      title: 'Pending Payments',
      count: 6,
      bgColor: 'bg-danger',
      icon: 'fas fa-dollar-sign',
      route: '/payments'
    }
  ];

  const handleNavigate = (route) => {
    console.log('Navigate to:', route);
  };

  return (
    <div className="container-fluid">

       <Title title='Dashboard' />

      <div className="row">
        {dashboardData.map((item, index) => (
          <UserDashboardCard
            key={index}
            title={item.title}
            count={item.count}
            bgColor={item.bgColor}
            icon={item.icon}
            onClick={() => handleNavigate(item.route)}
          />
        ))}
      </div>

      {/* <div className="col-md-12">
        <CasesIndex />
      </div> */}

    </div>
  )
}

export default Index