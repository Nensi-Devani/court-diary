import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Title from '../../components/ui/Title';
import FormInput from '../../components/form/FormInput';
import ImageUpload from '../../components/form/ImageUpload';

const Create = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    description: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageSelect = (file) => {
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      
      await axios.post('http://localhost:5000/api/clients', data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('Client added successfully');
      navigate('/clients');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title
        title='Add Client'
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
              <button type='submit' className='btn btn-primary px-4' disabled={loading}>
                {loading ? 'Adding...' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;