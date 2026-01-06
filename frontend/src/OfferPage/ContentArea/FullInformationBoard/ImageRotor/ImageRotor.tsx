import { useState } from "react";
import './ImageRotor.css';

const ImageRotor = ({images}: {images: any[]}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="slider">
      <img
        src={images[currentIndex]}
        alt="slider"
        style={{ width: "100%", height: "75%", cursor: 'pointer' }}
        onClick={() => setIsOpen(true)}
      />
      <div className="slider-controls">
        <button onClick={prevImage} className="rotor-btn">
        ⬅
        </button>
        <button onClick={nextImage} className="rotor-btn">
        ➡
        </button>
      </div>
      <h2>Obraz: {currentIndex + 1} z {images.length}</h2>
      {isOpen && (
        <div className="modal" onClick={() => setIsOpen(false)}>
          <img
            src={images[currentIndex]}
            alt="preview"
            className="modal-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>

      
  );
};

export default ImageRotor;