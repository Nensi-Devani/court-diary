import React from 'react'
import Table from '../../components/table/Table'
import user from '../../assets/images/user.jpg'
import Title from '../../components/ui/Title';
import AddBtn from '../../components/buttons/AddBtn'

const Index = () => {
  const columns = [
    { key: 'id', label: '#', type: 'text' },
    { key: 'clientImage', label: 'Client', type: 'image' },
    { key: 'clientName', label: 'Name', type: 'text' },
    { key: 'clientMobile', label: 'Mobile', type: 'text' },
    { key: 'activeCases', label: 'Active Cases', type: 'badge', badgeClass: 'bg-success' },
  ];

  const data = [
    {
      id: 1,
      clientImage: user,
      clientName: 'Ravi Parmar',
      clientMobile: '+91 123456789',
      activeCases: '5'
    },
    {
      id: 2,
      clientImage: user,
      clientName: 'Meera Shah',
      clientMobile: '+91 123456789',
      activeCases: '5'
    },
  ];

  return (
    <>
        <div className='d-flex justify-content-between align-items-center mb-3'>
            <Title title='Clients' />
            <AddBtn title='Client' to='/clients/create'/>
        </div>

        <Table
          columns={columns}
          data={data}
          onView={(row) => `/clients/view/${row.id}`}
          onEdit={(row) => `/clients/edit/${row.id}`}
          onDelete={(row) => alert('Delete ' + row.caseNo)}
        />
    </>
  )
}

export default Index