import React from 'react';
import './Modal.css'; // Stelle sicher, dass du das CSS für das Modal importierst

function Modal({ isOpen, onClose, onDelete, name, language, description }) {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <div className='modal-header'>
          <p className='modal-language'>{language}</p>
          <p className='modal-name'>{name}</p>
          
          <button className='modal-close' onClick={onClose}>×</button>
        </div>
        <p className='modal-description'>{description}</p>
        <button className='modal-delete' onClick={onDelete}>
          🗑️
        </button>
      </div>
    </div>
  );
}

export default Modal;
