// src/pages/lawyers/Create.jsx
import { useState } from 'react';
import Title from '../../../components/ui/Title';
import FormInput from '../../../components/form/FormInput';
import ImageUpload from '../../../components/form/ImageUpload';

const Create = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    officeEmail: '',
    officeContact: '',
    officeAddress: '',
  });

  const [imageFile, setImageFile] = useState(null);

  const handleImageSelect = (file) => {
    setImageFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      image: imageFile,
    };

    console.log('Lawyer Data:', data);
  };

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
                  value='Rohan'
                  setFormData={setFormData}
                  placeholder='Enter name'
                  required
                  className='col-md-6'
                />

                <FormInput
                  label='Mobile'
                  name='mobile'
                  value='1234567890'
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
                  value='rohan@gmail.com'
                  setFormData={setFormData}
                  placeholder='Enter email'
                  required
                  className='col-md-6'
                />

                <FormInput
                  label='Office Name'
                  name='officeName'
                  type='text'
                  value='R Laws'
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
                  value='r.laws@gmail.com'
                  setFormData={setFormData}
                  placeholder='Enter office email'
                  className='col-md-6'
                />

                <FormInput
                  label='Office Contact'
                  name='officeContact'
                  value='1122334422'
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
                  value='Rohan office address'
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
                Edit
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default Create