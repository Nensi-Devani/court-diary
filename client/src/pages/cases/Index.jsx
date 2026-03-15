import React from 'react'
import Table from '../../components/table/Table'
import user from '../../assets/images/user.jpg'
import Title from '../../components/ui/Title';
import AddBtn from '../../components/buttons/AddBtn';

const Index = () => {
  const columns = [
    { key: 'id', label: '#', type: 'text' },
    { key: 'caseNo', label: 'Case No.', type: 'text' },
    { key: 'clientImage', label: 'Client', type: 'image' },
    { key: 'clientName', label: 'Client Name', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'location', label: 'Location', type: 'text' },
    { key: 'oppositeLawyer', label: 'Opp. Lawyer', type: 'text' },
    { key: 'nextHearing', label: 'Next Hearing', type: 'text' },
    { key: 'uploadedDocuments', label: 'Uploaded Documents', type: 'badge', badgeClass: 'bg-secondary' },
    { key: 'paymentStatus', label: 'Payment', type: 'badge', badgeClass: 'bg-info' },
    { key: 'caseStatus', label: 'Case Status', type: 'badge', badgeClass: 'bg-success' },
  ];

  const data = [
    {
      id: 1,
      caseNo: 1245,
      clientImage: user,
      clientName: 'Ravi Parmar',
      title: 'Property Dispute',
      location: 'Rajkot',
      oppositeLawyer: 'Adv. Hiren Shah',
      nextHearing: '04-04-2026',
      uploadedDocuments: '5',
      paymentStatus: 'Paid',
      caseStatus: 'Active'
    },
    {
      id: 2,
      caseNo: 1246,
      clientImage: user,
      clientName: 'Meera Shah',
      title: 'Divorce Case',
      location: 'Ahmedabad',
      oppositeLawyer: 'Adv. Priya Singh',
      nextHearing: '14-04-2026',
      uploadedDocuments: '2',
      paymentStatus: 'Pending',
      caseStatus: 'Inactive'
    },
  ];

  return (
    <>
        <div className='d-flex justify-content-between align-items-center mb-3'>
            <Title title='Cases' />
            <AddBtn title='Case' to='/cases/create'/>
        </div>
        
        <Table
            columns={columns}
            data={data}
            onView={(row) => alert('View ' + row.caseNo)}
            onEdit={(row) => `/cases/edit/${row.id}`}
            onDelete={(row) => alert('Delete ' + row.caseNo)}
        />
    </>
  )
}

export default Index