import React, { useState } from 'react';
import axios from 'axios';
import './AddFunction.css';

function AddFunction() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await axios.post('http://localhost:5000/api/functions', {
        name,
        description,
        language,
      });
      setName('');
      setDescription('');
      setLanguage('');
    } catch (error) {
      console.error('Error adding function:', error);
    }
  };

  return (
    <div className='body'>
      <h2>Add New Function</h2>
      <form onSubmit={handleSubmit}>
        <div className='inputs'>
          <input
            type="text"
            placeholder="Function Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Add Function</button>
      </form>
    </div>
  );
}

export default AddFunction;
