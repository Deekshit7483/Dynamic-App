import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import './Form.css';

const Form = ({ fields }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); 
    setError(null); 

    try {
      const response = await axiosInstance.post('/api/form/submit', formData);
      console.log('Form Submitted:', response.data);
    } catch (err) {
      console.error('Form submission failed:', err);
      setError('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label || field.name}</label><br />
          <input
            type={field.type === 'datetime' ? 'datetime-local' : field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
          />
        </div>
      ))}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>


      {/* Show error message if any */}
      {error && 
      <p style={{ color: 'red' }}>{error}</p>
      } 
      
    </form>
  );
};

export default Form;
