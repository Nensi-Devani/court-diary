import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Title from '../../../components/ui/Title';
import { toast } from 'react-toastify';
import ImageUpload from '../../../components/form/ImageUpload';

const Create = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: 'password123',
    officeName: '',
    officeEmail: '',
    officeContact: '',
    officeAddress: '',
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleImageSelect = (file) => {
    setImageFile(file);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/users', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (imageFile) {
        const ad = new FormData();
        ad.append('avatar', imageFile);
        await axios.put(`http://localhost:5000/api/users/${res.data.data._id}/avatar`, ad, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        });
      }

      toast.success('Lawyer added successfully');
      navigate('/admin/lawyers');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add lawyer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title title="Add Lawyer" breadCrumpParent="Lawyers" breadCrumpParentLink="/admin/lawyers" />
      <div className="container">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <ImageUpload onImageSelect={handleImageSelect} />
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Name <span className="text-danger">*</span></label>
                  <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} placeholder="Enter name" required />
                </div>
                <div className="form-group col-md-6">
                  <label>Mobile <span className="text-danger">*</span></label>
                  <input type="text" name="mobile" className="form-control" value={formData.mobile} onChange={handleChange} placeholder="Enter mobile" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Email <span className="text-danger">*</span></label>
                  <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
                </div>
                <div className="form-group col-md-6">
                  <label>Password</label>
                  <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} placeholder="Default: password123" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Office Name</label>
                  <input type="text" name="officeName" className="form-control" value={formData.officeName} onChange={handleChange} placeholder="Enter office name" />
                </div>
                <div className="form-group col-md-6">
                  <label>Office Email</label>
                  <input type="email" name="officeEmail" className="form-control" value={formData.officeEmail} onChange={handleChange} placeholder="Enter office email" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Office Contact</label>
                  <input type="text" name="officeContact" className="form-control" value={formData.officeContact} onChange={handleChange} placeholder="Enter office contact" />
                </div>
                <div className="form-group col-md-6">
                  <label>Office Address</label>
                  <input type="text" name="officeAddress" className="form-control" value={formData.officeAddress} onChange={handleChange} placeholder="Enter office address" />
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                {loading ? 'Adding...' : 'Add Lawyer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;