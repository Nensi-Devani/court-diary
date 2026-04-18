import React from 'react'
import Title from '../../../components/ui/Title'
import AddBtn from '../../../components/buttons/AddBtn'
import Table from '../../../components/table/Table'
import user from '../../../assets/images/user.jpg'

const Index = () => {
    const columns = [
        { key: 'id', label: '#', type: 'text' },
        { key: 'lawyerImage', label: 'Lawyer', type: 'image' },
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'mobile', label: 'Mobile', type: 'text' },
        { key: 'activeCases', label: 'Active Cases', type: 'badge', badgeClass: 'bg-success' },
        { key: 'memberSince', label: 'Member Since', type: 'text' },
    ];

    const data = [
    {
        id: 1,
        lawyerImage: user,
        name: 'Amit Sharma',
        mobile: '+91 9876543210',
        activeCases: '12',
        memberSince: 'Jan 2022',
    },
    {
        id: 2,
        lawyerImage: user,
        name: 'Priya Mehta',
        mobile: '+91 9123456780',
        activeCases: '8',
        memberSince: 'Mar 2023',
    },
    {
        id: 3,
        lawyerImage: user,
        name: 'Rahul Patel',
        mobile: '+91 9988776655',
        activeCases: '15',
        memberSince: 'Jul 2021',
    },
    ];

  return (
    <>
      <div className='d-flex justify-content-between align-items-center mb-3'>
            <Title title='Lawyers' />
            <AddBtn title='Lawyer' to='/admin/lawyers/create'/>
        </div>

        <Table
          columns={columns}
          data={data}
          onView={(row) => `/admin/lawyers/view/${row.id}`}
          onEdit={(row) => `/admin/lawyers/edit/${row.id}`}
          onDelete={(row) => alert('Delete ' + row.caseNo)}
        />
    </>
  )
}

export default Index
