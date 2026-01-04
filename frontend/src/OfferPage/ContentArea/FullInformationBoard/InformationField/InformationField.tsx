import { useState } from "react";
import './InformationField.css';

const InformationField = () => {

  return (
    <div className="info-box">
      <div className="info-cell-name">Cena</div>
      <div className="info-cell-info">2</div>
      <div className="info-cell-name">Marka</div>
      <div className="info-cell-info">4</div>
      <div className="info-cell-name">Model</div>
      <div className="info-cell-info">6</div>
      <div className="info-cell-name">Paliwo</div>
      <div className="info-cell-info">8</div>
      <div className="info-cell-name">Przebieg</div>
      <div className="info-cell-info">10</div>  
    </div>

      
  );
};

export default InformationField;