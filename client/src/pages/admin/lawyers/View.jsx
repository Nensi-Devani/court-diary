import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../../../components/ui/Title';
import userImg from '../../../assets/images/user.jpg';

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLawyer(res.data.data);
      } catch (err) {
        toast.error('Failed to load lawyer details');
      } finally {
        setLoading(false);
      }
    };
    fetchLawyer();
  }, [id]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!lawyer) return <div className="p-4 text-center text-danger">Lawyer not found</div>;

  return (
    <>
      <Title title="View Lawyer" breadCrumpParent="Lawyers" breadCrumpParentLink="/admin/lawyers" />
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-3 text-center border-right">
                <img
                  src={lawyer.avatar || userImg}
                  alt="Lawyer"
                  className="img-circle"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <h4 className="mt-2">{lawyer.name}</h4>
                <p className="text-muted">Lawyer</p>
              </div>
              <div className="col-md-9">
                <h5 className="mb-3">Personal Details</h5>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td><strong>Email</strong></td>
                      <td>{lawyer.email}</td>
                      <td><strong>Mobile</strong></td>
                      <td>{lawyer.phone || '—'}</td>
                    </tr>
                    <tr>
                      <td><strong>Role</strong></td>
                      <td className="text-capitalize">{lawyer.role}</td>
                      <td><strong>Verified</strong></td>
                      <td>{lawyer.isVerified ? <span className="badge bg-success">Yes</span> : <span className="badge bg-danger">No</span>}</td>
                    </tr>
                    <tr>
                      <td><strong>Member Since</strong></td>
                      <td colSpan="3">{new Date(lawyer.createdAt).toLocaleDateString()}</td>
                    </tr>
                  </tbody>
                </table>
                <h5 className="mb-3 mt-3">Office Details</h5>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td><strong>Office Name</strong></td>
                      <td>{lawyer.office?.name || '—'}</td>
                      <td><strong>Office Email</strong></td>
                      <td>{lawyer.office?.email || '—'}</td>
                    </tr>
                    <tr>
                      <td><strong>Office Phone</strong></td>
                      <td>{lawyer.office?.phone || '—'}</td>
                      <td><strong>Office Address</strong></td>
                      <td>{lawyer.office?.address || '—'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button className="btn btn-warning mr-2" onClick={() => navigate(`/admin/lawyers/edit/${id}`)}>Edit</button>
            <button className="btn btn-secondary" onClick={() => navigate('/admin/lawyers')}>Back</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
