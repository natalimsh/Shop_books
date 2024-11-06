import React from "react";
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ isOpen, onClose, image, title, description, onAddToCart }) => {
  if (!isOpen) return null;

  // Функція для закриття модального вікна при кліку на фон
  const handleOverlayClick = (e) => {
    // Закриваємо модальне вікно, тільки якщо клікнули на сам фон, а не на вміст
    if (e.target.classList.contains('modal')) {
      onClose();
    }
  };

  return (
    <div 
      className="modal show" 
      tabIndex="-1" 
      role="dialog" 
      style={{ display: "block" }} 
      onClick={handleOverlayClick} // Додаємо обробник кліку на фон
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Закрити">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <img src={image} alt={title} className="modal-image" />
            <p className="modal-description">{description}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onAddToCart}>
              Придбати
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default Modal;
