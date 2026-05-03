import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../../components/ui/Title';
import FormInput from '../../components/form/FormInput';
import ImageUpload from '../../components/form/ImageUpload';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    description: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/clients/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const client = res.data.data;
        setFormData({
          name: client.name || '',
          phone: client.phone || '',
          address: client.address || '',
          description: client.description || '',
        });
      } catch (err) {
        toast.error('Failed to load client details');
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]);

  const handleImageSelect = (file) => {
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append('name', formData.name);
      data.append('phone', formData.phone);
      data.append('address', formData.address);
      data.append('description', formData.description);
      if (imageFile) {
        data.append('avatar', imageFile);
      }
      
      await axios.put(`http://localhost:5000/api/clients/${id}`, data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Client updated successfully');
      navigate('/clients');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update client');
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <>
      <Title
        title='Edit Client'
        breadCrumpParent='Clients'
        breadCrumpParentLink='/clients'
      />

      <div className='container'>
        <div className='card'>
          <form onSubmit={handleSubmit}>
            <div className='card-body'>

              <ImageUpload onImageSelect={handleImageSelect} />

              <div className='form-row'>
                <FormInput
                  label='Name'
                  name='name'
                  value={formData.name}
                  setFormData={setFormData}
                  placeholder='Enter client name'
                  required
                  className='col-md-6'
                />

                <FormInput
                  label='Mobile'
                  name='phone'
                  value={formData.phone}
                  setFormData={setFormData}
                  placeholder='Enter mobile'
                  required
                  className='col-md-6'
                />
              </div>

              <div className='form-row'>
                <FormInput
                  label='Address'
                  name='address'
                  value={formData.address}
                  setFormData={setFormData}
                  placeholder='Enter address'
                  required
                  as='textarea'
                  rows={4}
                  className='col-md-6'
                />

                <FormInput
                  label='Other Description'
                  name='description'
                  value={formData.description}
                  setFormData={setFormData}
                  placeholder='Enter description'
                  required
                  as='textarea'
                  rows={4}
                  className='col-md-6'
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