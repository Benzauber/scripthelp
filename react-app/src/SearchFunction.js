import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchFunction.css';
import Modal from './Modal'; // Importiere die Modal-Komponente

function SearchFunction() {
  const [functions, setFunctions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLanguage, setSearchLanguage] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [debouncedLanguage, setDebouncedLanguage] = useState(searchLanguage);
  const [selectedFunction, setSelectedFunction] = useState(null);

  // Debounce function to delay the search until the user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setDebouncedLanguage(searchLanguage);
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, searchLanguage]);

  useEffect(() => {
    fetchFunctions();
  }, [debouncedQuery, debouncedLanguage]);

  const fetchFunctions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/functions/search', {
        params: { query: debouncedQuery, language: debouncedLanguage }
      });
      setFunctions(response.data);
    } catch (error) {
      console.error('Error searching functions:', error);
    }
  };

  const handleNameClick = (id, name, language, description) => {
    setSelectedFunction({ id, name, language, description });
  };

  const handleCloseModal = () => {
    setSelectedFunction(null);
  };

  const handleDeleteFunction = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/functions/${selectedFunction.id}`);
      setFunctions(functions.filter(func => func.id !== selectedFunction.id));
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting function:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Search Functions</h2>
      <form>
        <input
          type="text"
          placeholder="Search by description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by language"
          value={searchLanguage}
          onChange={(e) => setSearchLanguage(e.target.value)}
        />
      </form>
      <ul>
        {functions.map((func) => (
          <li key={func.id} onClick={() => handleNameClick(func.id, func.name, func.language, func.description)}>
            <strong>
              {func.name}
            </strong>
            <div className='language'>{func.language}</div>
          </li>
        ))}
      </ul>
      {selectedFunction && (
        <Modal
          isOpen={!!selectedFunction}
          onClose={handleCloseModal}
          onDelete={handleDeleteFunction}
          name={selectedFunction.name}
          language={selectedFunction.language}
          description={selectedFunction.description}
        />
      )}
    </div>
  );
}

export default SearchFunction;
