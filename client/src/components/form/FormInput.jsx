import React from 'react'

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  setFormData,
  placeholder,
  required = false,
  as = 'input',
  rows = 3,
  className = '',
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={`form-group ${className}`}>
      {label && <label>{label}</label>}

      {as === 'textarea' ? (
        <textarea
          name={name}
          value={value || ''}   // ✅ prevent undefined
          onChange={handleChange} // ✅ REQUIRED
          placeholder={placeholder}
          rows={rows}
          className='form-control'
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value || ''}   // ✅ prevent undefined
          onChange={handleChange} // ✅ REQUIRED
          placeholder={placeholder}
          className='form-control'
          required={required}
        />
      )}
    </div>
  )
}

export default FormInput