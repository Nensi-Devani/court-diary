import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../../components/ui/Title';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match', { style: { color: 'red' } });
      return;
    }
    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters', { style: { color: 'red' } });
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/users/me/change-password',
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Password changed successfully');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title title="Change Password" />
      <div className="container">
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div className="card-header">
            <h3 className="card-title">Change Password</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="form-group">
                <label>Current Password <span className="text-danger">*</span></label>
                <input
                  type="password"
                  name="currentPassword"
                  className="form-control"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                  required
                />
              </div>
              <div className="form-group">
                <label>New Password <span className="text-danger">*</span></label>
                <input
                  type="password"
                  name="newPassword"
                  className="form-control"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password (min 6 chars)"
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password <span className="text-danger">*</span></label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter new password"
                  required
                />
              </div>
            </div>
            <div className="card-footer text-center">
              <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;