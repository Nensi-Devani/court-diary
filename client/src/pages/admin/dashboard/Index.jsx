import React from 'react'
import AdminDashboardCard from '../../../components/dashboard/AdminDashboardCard'
import Title from '../../../components/ui/Title'
// import CasesIndex from '../cases/Index'

const Index = () => {

 const dashboardData = [
  {
    title: 'Total Lawyers',
    value: 105,
    icon: 'fas fa-user-graduate',
    bgColor: 'bg-info',
    suffix: '',
  },
  {
    title: 'Total Cases',
    value: '1,410',
    icon: 'fas fa-file',
    bgColor: 'bg-danger',
    suffix: '',
  },
  {
    title: 'Active Cases',
    value: 760,
    icon: 'fas fa-check',
    bgColor: 'bg-success',
    suffix: '',
  },
  {
    title: 'Today Hearing',
    value: 200,
    icon: 'fas fa-gavel',
    bgColor: 'bg-secondary',
    suffix: '',
  },
  {
    title: 'Today Meetings',
    value: 200,
    icon: 'fas fa-calendar',
    bgColor: 'bg-primary',
    suffix: '',
  },
  {
    title: 'Total Clients',
    value: '2,000',
    icon: 'fas fa-users',
    bgColor: 'bg-warning',
    suffix: '',
  }
]

  const handleNavigate = (route) => {
    console.log('Navigate to:', route);
  };

  return (
    <div className="container-fluid">

       <Title title='Dashboard' />

      <div className="row">
        {dashboardData.map((item, index) => (
          <AdminDashboardCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
            bgColor={item.bgColor}
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