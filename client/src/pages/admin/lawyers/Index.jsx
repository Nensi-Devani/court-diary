import React, { useState, useEffect } from 'react';
import Title from '../../../components/ui/Title';
import AddBtn from '../../../components/buttons/AddBtn';
import user from '../../../assets/images/user.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaCalendarAlt } from 'react-icons/fa';

const Index = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    // Meetings modal state
    const [showMeetings, setShowMeetings] = useState(false);
    const [selectedLawyer, setSelectedLawyer] = useState(null);
    const [meetings, setMeetings] = useState([]);
    const [meetingsLoading, setMeetingsLoading] = useState(false);

    const fetchLawyers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/users', {
                headers: { Authorization: `Bearer ${token}` },
                params: { role: 'lawyer', search },
            });
            setData(res.data.data);
        } catch (err) {
            toast.error('Failed to load lawyers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchLawyers(); }, []);

    const handleSearchSubmit = (e) => { e.preventDefault(); fetchLawyers(); };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Delete lawyer "${name}"?`)) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Lawyer deleted');
            fetchLawyers();
        } catch (err) {
            toast.error('Failed to delete lawyer');
        }
    };

    const handleViewMeetings = async (lawyer) => {
        setSelectedLawyer(lawyer);
        setShowMeetings(true);
        setMeetingsLoading(true);
        try {
            const token = localStorage.getItem('token');
            // Get meetings for this lawyer by their userId
            const res = await axios.get('http://localhost:5000/api/meetings', {
                headers: { Authorization: `Bearer ${token}` },
                params: { userId: lawyer._id },
            });
            setMeetings(res.data.data || []);
        } catch (err) {
            toast.error('Failed to load meetings');
            setMeetings([]);
        } finally {
            setMeetingsLoading(false);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-3">
                    <Title title="Lawyers" />
                    <form onSubmit={handleSearchSubmit} className="d-flex gap-2">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Search lawyers..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ width: '200px' }}
                        />
                        <button type="submit" className="btn btn-sm btn-primary">Search</button>
                    </form>
                </div>
                <AddBtn title="Lawyer" to="/admin/lawyers/create" />
            </div>

            {loading ? <p className="text-center">Loading...</p> : (
                <div className="card mx-3">
                    <div className="card-body p-0">
                        <table className="table table-striped text-center">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Office</th>
                                    <th>Member Since</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length === 0 ? (
                                    <tr><td colSpan="8" className="text-muted py-3">No lawyers found</td></tr>
                                ) : data.map((lawyer, idx) => (
                                    <tr key={lawyer._id}>
                                        <td>{idx + 1}</td>
                                        <td>
                                            <img src={lawyer.avatar || user} alt="img"
                                                className="img-circle" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                        </td>
                                        <td>{lawyer.name}</td>
                                        <td>{lawyer.email}</td>
                                        <td>{lawyer.phone || 'N/A'}</td>
                                        <td>{lawyer.office?.name || 'N/A'}</td>
                                        <td>{new Date(lawyer.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <div className="d-flex justify-content-center gap-2">
                                                <button
                                                    className="btn btn-sm btn-info"
                                                    title="View Meetings"
                                                    onClick={() => handleViewMeetings(lawyer)}
                                                >
                                                    <FaCalendarAlt />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-primary"
                                                    title="View"
                                                    onClick={() => navigate(`/admin/lawyers/view/${lawyer._id}`)}
                                                >
                                                    <FaEye />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-warning"
                                                    title="Edit"
                                                    onClick={() => navigate(`/admin/lawyers/edit/${lawyer._id}`)}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    title="Delete"
                                                    onClick={() => handleDelete(lawyer._id, lawyer.name)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Meetings Modal */}
            {showMeetings && (
                <div
                    className="modal fade show"
                    style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
                    onClick={(e) => { if (e.target === e.currentTarget) setShowMeetings(false); }}
                >
                    <div className="modal-dialog modal-lg" style={{ marginTop: '60px' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <FaCalendarAlt className="me-2" />
                                    Meetings — {selectedLawyer?.name}
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowMeetings(false)}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {meetingsLoading ? (
                                    <p className="text-center">Loading meetings...</p>
                                ) : meetings.length === 0 ? (
                                    <p className="text-center text-muted">No meetings found for this lawyer.</p>
                                ) : (
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Start</th>
                                                <th>End</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {meetings.map((m, i) => (
                                                <tr key={m._id}>
                                                    <td>{i + 1}</td>
                                                    <td>{m.title}</td>
                                                    <td>{new Date(m.startDatetime).toLocaleString()}</td>
                                                    <td>{new Date(m.endDatetime).toLocaleString()}</td>
                                                    <td>
                                                        <span className={`badge ${m.status === 'upcoming' ? 'bg-primary' : m.status === 'completed' ? 'bg-success' : 'bg-danger'}`}>
                                                            {m.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowMeetings(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Index;
