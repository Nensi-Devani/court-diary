import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../../../components/ui/Title';
import FormInput from '../../../components/form/FormInput';
import ImageUpload from '../../../components/form/ImageUpload';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    officeName: '',
    officeEmail: '',
    officeContact: '',
    officeAddress: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const lawyer = res.data.data;
        setFormData({
          name: lawyer.name || '',
          mobile: lawyer.phone || '',
          email: lawyer.email || '',
          officeName: lawyer.office?.name || '',
          officeEmail: lawyer.office?.email || '',
          officeContact: lawyer.office?.phone || '',
          officeAddress: lawyer.office?.address || '',
        });
      } catch (err) {
        toast.error('Failed to load lawyer details');
      } finally {
        setLoading(false);
      }
    };
    fetchLawyer();
  }, [id]);

  const handleImageSelect = (file) => {
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/users/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (imageFile) {
        const ad = new FormData();
        ad.append('avatar', imageFile);
        await axios.put(`http://localhost:5000/api/users/${id}/avatar`, ad, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        });
      }

      toast.success('Lawyer updated successfully');
      navigate('/admin/lawyers');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update lawyer');
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <>
      <Title
        title='Edit Lawyer'
        breadCrumpParent='Lawyers'
        breadCrumpParentLink='/admin/lawyers'
      />

      <div className='container'>
        <div className='card'>
          <form onSubmit={handleSubmit}>
            <div className='card-body'>

              {/* Image Upload */}
              <ImageUpload onImageSelect={handleImageSelect} />

              {/* Name & Mobile */}
              <div className='form-row'>
                <FormInput
                  label='Name'
                  name='name'
                  value={formData.name}
                  setFormData={setFormData}
                  placeholder='Enter name'
                  required
                  className='col-md-6'
                />

                <FormInput
                  label='Mobile'
                  name='mobile'
                  value={formData.mobile}
                  setFormData={setFormData}
                  placeholder='Enter mobile'
                  required
                  className='col-md-6'
                />
              </div>

              {/* Email & Office Email */}
              <div className='form-row'>
                <FormInput
                  label='Email'
                  name='email'
                  type='email'
                  value={formData.email}
                  setFormData={setFormData}
                  placeholder='Enter email'
                  required
                  className='col-md-6'
                />

                <FormInput
                  label='Office Name'
                  name='officeName'
                  type='text'
                  value={formData.officeName}
                  setFormData={setFormData}
                  placeholder='Enter office name'
                  className='col-md-6'
                />
              </div>

              {/* Office Contact */}
              <div className='form-row'>
                   <FormInput
                  label='Office Email'
                  name='officeEmail'
                  type='email'
                  value={formData.officeEmail}
                  setFormData={setFormData}
                  placeholder='Enter office email'
                  className='col-md-6'
                />

                <FormInput
                  label='Office Contact'
                  name='officeContact'
                  value={formData.officeContact}
                  setFormData={setFormData}
                  placeholder='Enter office contact'
                  className='col-md-6'
                />
              </div>

              {/* Office Address */}
              <div className='form-row'>
                <FormInput
                  label='Office Address'
                  name='officeAddress'
                  value={formData.officeAddress}
                  setFormData={setFormData}
                  placeholder='Enter office address'
                  as='textarea'
                  rows={4}
                  className='col-md-12'
                />
              </div>

            </div>

            <div className='card-footer text-center'>
              <button type='submit' className='btn btn-primary px-4'>
                Update
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;