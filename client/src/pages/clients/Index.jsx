import React, { useState, useEffect } from 'react';
import Table from '../../components/table/Table';
import user from '../../assets/images/user.jpg';
import Title from '../../components/ui/Title';
import AddBtn from '../../components/buttons/AddBtn';
import axios from 'axios';
import { toast } from 'react-toastify';

const Index = ({ isModal = false, onSelect }) => {
  const columns = [
    { key: 'id', label: '#', type: 'text' },
    { key: 'clientImage', label: 'Client', type: 'image' },
    { key: 'clientName', label: 'Name', type: 'text' },
    { key: 'clientMobile', label: 'Mobile', type: 'text' },
    { key: 'activeCases', label: 'Active Cases', type: 'badge', badgeClass: 'bg-success' },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchClients = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/clients", {
        headers: { Authorization: `Bearer ${token}` },
        params: { search }
      });
      
      const formattedData = res.data.data.map(item => ({
        id: item._id,
        _id: item._id, // Keep original _id for selection
        clientImage: item.avatar || user,
        clientName: item.name,
        clientMobile: item.phone || 'N/A',
        activeCases: item.activeCasesCount || '0',
        original: item // Store original item
      }));
      
      setData(formattedData);
    } catch (err) {
      toast.error("Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchClients();
  };

  const handleDelete = async (row) => {
    if(!window.confirm(`Are you sure you want to delete client ${row.clientName}?`)) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/clients/${row.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Client deleted successfully");
      fetchClients();
    } catch(err) {
      toast.error("Failed to delete client");
    }
  };

  return (
    <div className={isModal ? "p-0" : ""}>
        {!isModal && (
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <div className='d-flex align-items-center gap-3'>
                <Title title='Clients' />
                <form onSubmit={handleSearchSubmit} className="d-flex gap-2">
                    <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    placeholder="Search clients..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: '200px' }}
                    />
                    <button type="submit" className="btn btn-sm btn-primary">Search</button>
                </form>
                </div>
                <AddBtn title='Client' to='/clients/create'/>
            </div>
        )}

        {loading ? <p>Loading...</p> : (
          <Table
            columns={columns}
            data={data}
            onView={!isModal ? (row) => `${localStorage.getItem('userRole') === 'admin' ? '/admin' : ''}/clients/view/${row.id}` : null}
            onEdit={!isModal ? (row) => `${localStorage.getItem('userRole') === 'admin' ? '/admin' : ''}/clients/edit/${row.id}` : null}
            onDelete={!isModal ? handleDelete : null}
            actions={isModal ? (row) => (
                <button 
                    className="btn btn-sm btn-success" 
                    onClick={() => onSelect(row.original)}
                >
                    Select
                </button>
            ) : null}
          />
        )}
    </div>
  )
}

export default Index