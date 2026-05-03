import React, { useState, useEffect } from 'react';
import Table from '../../components/table/Table';
import user from '../../assets/images/user.jpg';
import Title from '../../components/ui/Title';
import AddBtn from '../../components/buttons/AddBtn';
import axios from 'axios';
import { toast } from 'react-toastify';

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
    { key: 'paymentStatus', label: 'Payment', type: 'badge', badgeClass: (val) => val.includes('Pending') ? 'bg-secondary' : 'bg-info' },
    { key: 'caseStatus', label: 'Case Status', type: 'badge', badgeClass: (val) => val === 'Active' ? 'bg-success' : val === 'Inactive' ? 'bg-danger' : 'bg-warning' },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const limit = localStorage.getItem("userRole") === "admin" ? 5 : 10;
      const res = await axios.get("http://localhost:5000/api/cases", {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, status: statusFilter, page, limit }
      });
      
      const formattedData = res.data.data.map(item => ({
        id: item._id,
        caseNo: item.caseNo,
        clientImage: item.clientId?.avatar || user,
        clientName: item.clientId?.name || item.parties.find(p => p.type === 'client')?.name || 'N/A',
        title: item.title,
        location: item.location || 'N/A',
        oppositeLawyer: item.parties.find(p => p.type === 'lawyer')?.name || 'N/A',
        nextHearing: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A',
        uploadedDocuments: item.uploads ? item.uploads.length.toString() : '0',
        paymentStatus: `${item.paymentStatus || 'Pending'}${item.paymentAmount ? ' (₹' + item.paymentAmount + ')' : ''}`,
        caseStatus: item.status
      }));
      
      setData(formattedData);
      setTotalPages(res.data.pagination.pages);
    } catch (err) {
      toast.error("Failed to load cases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, [statusFilter, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCases();
  };

  const handleDelete = async (row) => {
    if(!window.confirm(`Are you sure you want to delete case ${row.caseNo}?`)) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/cases/${row.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Case deleted successfully");
      fetchCases();
    } catch(err) {
      toast.error("Failed to delete case");
    }
  };

  return (
    <>
        <div className='d-flex justify-content-between align-items-center mb-3'>
            <div className='d-flex align-items-center gap-3'>
              <Title title='Cases' />
              
              <form onSubmit={handleSearchSubmit} className="d-flex gap-2">
                <input 
                  type="text" 
                  className="form-control form-control-sm" 
                  placeholder="Search..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ width: '200px' }}
                />
                <button type="submit" className="btn btn-sm btn-primary">Search</button>
              </form>

              <select 
                className="form-control form-control-sm" 
                value={statusFilter} 
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                style={{ width: '150px' }}
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Reopened">Reopened</option>
              </select>
            </div>
            
            <AddBtn title='Case' to='/cases/create'/>
        </div>
        
        {loading ? <p>Loading...</p> : (
          <>
            <Table
                columns={columns}
                data={data}
                onView={(row) => `${localStorage.getItem('userRole') === 'admin' ? '/admin' : ''}/cases/view/${row.id}`}
                onEdit={(row) => `${localStorage.getItem('userRole') === 'admin' ? '/admin' : ''}/cases/edit/${row.id}`}
                onDelete={handleDelete}
            />
            <div className="d-flex justify-content-between align-items-center mt-3 mx-3">
              <span>Page {page} of {totalPages}</span>
              <div className="btn-group">
                <button 
                  className="btn btn-sm btn-outline-primary" 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >Previous</button>
                <button 
                  className="btn btn-sm btn-outline-primary" 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || totalPages === 0}
                >Next</button>
              </div>
            </div>
          </>
        )}
    </>
  )
}

export default Index