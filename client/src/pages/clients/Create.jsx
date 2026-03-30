import { useState } from 'react'
import Title from '../../components/ui/Title'
import FormInput from '../../components/form/FormInput'
import ImageUpload from '../../components/form/ImageUpload'

const Create = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    description: '',
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

    console.log('Client Data:', data);
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
                  name='mobile'
                  value={formData.mobile}
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
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Create