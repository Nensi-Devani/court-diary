import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../../components/ui/Title';
import userImg from '../../assets/images/user.jpg';

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    officeName: '',
    officeEmail: '',
    officeContact: '',
    officeAddress: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const u = res.data.data;
        setFormData({
          name: u.name || '',
          email: u.email || '',
          phone: u.phone || '',
          officeName: u.office?.name || '',
          officeEmail: u.office?.email || '',
          officeContact: u.office?.phone || '',
          officeAddress: u.office?.address || '',
        });
        if (u.avatar) {
          setPreview(u.avatar);
        }
      } catch (err) {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/users/me', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (avatar) {
        const ad = new FormData();
        ad.append('avatar', avatar);
        await axios.put('http://localhost:5000/api/users/me/avatar', ad, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        });
      }

      // Update localStorage name
      localStorage.setItem('userName', formData.name);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <>
      <Title title="Edit Profile" />
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Update Profile</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="text-center mb-3">
                <div className="position-relative d-inline-block">
                  <img
                    src={preview || userImg}
                    alt="Profile"
                    className="img-circle"
                    style={{ width: '100px', height: '100px', objectFit: 'cover', border: '3px solid #ddd' }}
                  />
                  <label htmlFor="avatar-upload" className="btn btn-xs btn-primary position-absolute" style={{ bottom: '0', right: '0', borderRadius: '50%', padding: '5px' }}>
                    <i className="fa fa-camera"></i>
                    <input 
                      type="file" 
                      id="avatar-upload" 
                      hidden 
                      accept="image/*" 
                      onChange={handleFileChange} 
                    />
                  </label>
                </div>
                <div className="mt-1 text-muted" style={{ fontSize: '13px' }}>Profile Photo</div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Full Name <span className="text-danger">*</span></label>
                  <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} placeholder="Enter full name" required />
                </div>
                <div className="form-group col-md-6">
                  <label>Email <span className="text-danger">*</span></label>
                  <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Phone</label>
                  <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} placeholder="Enter phone" />
                </div>
                <div className="form-group col-md-6">
                  <label>Office Name</label>
                  <input type="text" name="officeName" className="form-control" value={formData.officeName} onChange={handleChange} placeholder="Enter office name" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Office Email</label>
                  <input type="email" name="officeEmail" className="form-control" value={formData.officeEmail} onChange={handleChange} placeholder="Enter office email" />
                </div>
                <div className="form-group col-md-6">
                  <label>Office Contact</label>
                  <input type="text" name="officeContact" className="form-control" value={formData.officeContact} onChange={handleChange} placeholder="Enter office contact" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label>Office Address</label>
                  <textarea name="officeAddress" className="form-control" value={formData.officeAddress} onChange={handleChange} placeholder="Enter office address" rows={3} />
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              <button type="submit" className="btn btn-primary px-4" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;