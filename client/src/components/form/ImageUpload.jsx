import React, { useState } from 'react'

const ImageUpload = ({ onImageSelect }) => {
  const defaultImage =
    'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  const [imagePreview, setImagePreview] = useState(defaultImage);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));
      onImageSelect(file); // send file to parent
    }
  };

  return (
    <div className='text-center mb-4'>
      <img
        src={imagePreview}
        alt='profile'
        style={{ width: '90px', height: '90px' }}
        className='mb-2 rounded rounded-circle'
      />

      <div className='form-group'>
        <div className='input-group justify-content-center'>
          <div className='custom-file' style={{ maxWidth: '200px' }}>
            <input
              type='file'
              className='custom-file-input'
              id='clientImage'
              onChange={handleImageChange}
            />
            <label className='custom-file-label' htmlFor='clientImage'>
              Choose
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageUpload